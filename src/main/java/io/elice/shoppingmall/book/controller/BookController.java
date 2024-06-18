package io.elice.shoppingmall.book.controller;

import io.elice.shoppingmall.book.model.BookMapper;
import io.elice.shoppingmall.book.model.Dto.BookFormDto;
import io.elice.shoppingmall.book.model.Dto.BookMainDto;
import io.elice.shoppingmall.book.model.Dto.BookMainDtos;
import io.elice.shoppingmall.book.model.Entity.Book;
import io.elice.shoppingmall.book.model.Entity.BookImg;
import io.elice.shoppingmall.book.service.BookImgService;
import io.elice.shoppingmall.book.service.BookService;
import io.elice.shoppingmall.category.model.Category;
import io.elice.shoppingmall.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;
    private final BookImgService bookImgService;
    private final BookMapper mapper;
    private final CategoryService categoryService;

    //이미지 파일 업로드시 고유한 이름 생성을 위한 함수
    private String generateUniqueFileName(String originalFileName) {
        // 원본 파일의 확장자 추출
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        // UUID를 사용하여 고유한 파일명 생성
        String uniqueFileName = UUID.randomUUID().toString() + extension;
        return uniqueFileName;
    }

    //배포시 http://34.64.32.227, 개발시 http://localhost:8080사용하기
    private String serverHost = "http://localhost:8080";

    @PostMapping("/admin/book")
    public ResponseEntity<?> postBook(@ModelAttribute BookFormDto bookFormDto, @RequestParam(value = "images", required = false) List<MultipartFile> images) throws IOException {

        Book newBook = mapper.BookFormDtoToBook(bookFormDto);
        List<BookImg> bookImgs = new ArrayList<>();
        Category category = categoryService.getCategoryById(bookFormDto.getCategoryId());
        newBook.setCategory(category);

        // 이미지 파일들 업로드
        if (images != null && !images.isEmpty()) {

            for (MultipartFile image : images) {
                if (!image.isEmpty()) {
                    // 고유한 파일명 생성
                    String uniqueFileName = generateUniqueFileName(image.getOriginalFilename());
                    // 이미지 저장 경로 설정
                    Path path = Paths.get("./uploadImages", uniqueFileName);
                    // 폴더없을때 에러방지
                    if (!Files.exists(path)) {
                        Files.createDirectories(path);
                    }
                    // 이미지 파일 저장
                    Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                    // 서버에서 접근 가능한 이미지 URL 생성
                    String imageUrl = serverHost + "/uploadImages/" + uniqueFileName;
                    // 이미지 이름이나 경로를 (이미지당 하나씩) BookImg를 만들고 거기에 담음.
                    BookImg bookImg = new BookImg();
                    bookImg.setImgName(uniqueFileName);
                    bookImg.setImgOriName(image.getOriginalFilename());
                    bookImg.setImgUrl(imageUrl);
                    BookImg savedImg = bookImgService.save(bookImg);
                    bookImgs.add(savedImg);


                }
            }
        }

        newBook.setBookImgList(bookImgs);
        Book savedBook = bookService.saveBook(newBook);

        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }


    //책 수정
    @PutMapping("/admin/book/{bookId}")
    public ResponseEntity<?> putBook(@PathVariable Long bookId,@ModelAttribute BookFormDto bookFormDto, @RequestPart(value = "images", required = false) List<MultipartFile> images) throws IOException {

        Book oldBook = bookService.getbookDetail(bookId);
        List<BookImg> bookImgs = new ArrayList<>();
        Category category = categoryService.getCategoryById(bookFormDto.getCategoryId());
        oldBook.setCategory(category);
        oldBook.setStock(bookFormDto.getStock());
        oldBook.setDate(bookFormDto.getDate());
        oldBook.setAuthor(bookFormDto.getAuthor());
        oldBook.setName(bookFormDto.getName());
        oldBook.setDetail(bookFormDto.getDetail());
        oldBook.setPrice(bookFormDto.getPrice());
        oldBook.setPublisher(bookFormDto.getPublisher());
        oldBook.setTableOfContents(bookFormDto.getTableOfContents());

        //이미지 삭제
        if (images == null || images.isEmpty()) {
            oldBook.setBookImgList(new ArrayList<>());
        }

        // 이미지 파일들 변경
        if (images != null && !images.isEmpty()) {

            for (MultipartFile image : images) {
                if (!image.isEmpty()) {
                    // 고유한 파일명 생성
                    String uniqueFileName = generateUniqueFileName(image.getOriginalFilename());
                    // 이미지 저장 경로 설정
                    Path path = Paths.get("./uploadImages", uniqueFileName);
                    // 이미지 파일 저장
                    Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                    // 서버에서 접근 가능한 이미지 URL 생성
                    String imageUrl = serverHost + "/uploadImages/" + uniqueFileName;
                    // 이미지 이름이나 경로를 (이미지당 하나씩) BookImg를 만들고 거기에 담음.
                    BookImg bookImg = new BookImg();
                    bookImg.setImgName(uniqueFileName);
                    bookImg.setImgOriName(image.getOriginalFilename());
                    bookImg.setImgUrl(imageUrl);
                    BookImg savedImg = bookImgService.save(bookImg);
                    bookImgs.add(savedImg);


                }
            }
        }

        oldBook.setBookImgList(bookImgs);
        Book savedBook = bookService.saveBook(oldBook);

        return new ResponseEntity<>(savedBook, HttpStatus.OK);
    }


    //책 조회
    @GetMapping("/book/{bookId}")
    public ResponseEntity<BookMainDto> getBook(@PathVariable Long bookId) {

        //찾아옴
        Book findedBook = bookService.getbookDetail(bookId);
        //없으면 404반환
        if (findedBook == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        //있으면 맵퍼로 dto로 변환
        BookMainDto bookMainDto = mapper.bookToBookMainDto(findedBook);
        return new ResponseEntity<>(bookMainDto, HttpStatus.OK);
    }

    //특정카테고리 책목록 조회
    @GetMapping("/books/category/{categoryId}")
    public ResponseEntity<BookMainDtos> getBooksByCategoryId(@PathVariable Integer categoryId, @PageableDefault(page = 0, size = 10,sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<Book> findBooks = bookService.findBooksByCategoryId(categoryId, pageable);

        if (findBooks == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        BookMainDtos bookMainDtos = mapper.bookPageToBookMainDtos(findBooks);

        return  new ResponseEntity<>(bookMainDtos, HttpStatus.OK);
    }

    //제목검색 //프론트 우선도 낮음
    @GetMapping("/books/search")
    public ResponseEntity<BookMainDtos> getBooksByKeyword(@RequestParam String keyword, @PageableDefault(page = 0, size = 10,sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<Book> findBooks = bookService.findBooksByKeyword(keyword, pageable);

        if (findBooks == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        BookMainDtos bookMainDtos = mapper.bookPageToBookMainDtos(findBooks);

        return  new ResponseEntity<>(bookMainDtos, HttpStatus.OK);
    }

    @DeleteMapping("admin/book/{bookId}")
    public ResponseEntity<?> deleteBook(@PathVariable Long bookId) {

        Book findBook = bookService.getbookDetail(bookId);

        if (findBook == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        bookService.deleteBook(bookId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}