package io.elice.shoppingmall.book.controller;

import io.elice.shoppingmall.book.model.BookMapper;
import io.elice.shoppingmall.book.model.Dto.BookFormDto;
import io.elice.shoppingmall.book.model.Dto.BookMainDto;
import io.elice.shoppingmall.book.model.Entity.Book;
import io.elice.shoppingmall.book.model.Entity.BookImg;
import io.elice.shoppingmall.book.service.BookImgService;
import io.elice.shoppingmall.book.service.BookService;
import io.elice.shoppingmall.category.model.Category;
import io.elice.shoppingmall.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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

    private String serverHost = "http://localhost:8080";

    @PostMapping("/admin/book")
    public ResponseEntity<?> postBook(@ModelAttribute BookFormDto bookFormDto, @RequestParam("images") List<MultipartFile> images) throws IOException {

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

}