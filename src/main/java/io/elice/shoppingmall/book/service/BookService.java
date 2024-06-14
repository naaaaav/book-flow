package io.elice.shoppingmall.book.service;

import io.elice.shoppingmall.book.model.Entity.Book;
import io.elice.shoppingmall.book.model.Entity.BookImg;
import io.elice.shoppingmall.book.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    //책 등록
    @Transactional
    public Book saveBook(Book book){

        return bookRepository.save(book);
    }

    // 상품 조회

    public Book getbookDetail(Long bookId) {

        Optional<Book> findBook = bookRepository.findByIdAndIsDeletedFalse(bookId);
        //못찾으면 null반환
        if(findBook.isEmpty()) {
            return null;
        }
        //찾은거 반환
        return findBook.get();

    }

    public Page<Book> findBooksByCategoryId(Integer categoryId, Pageable pageable) {

        Page<Book> findBooks = bookRepository.findAllByCategoryIdAndIsDeletedFalse(categoryId, pageable);

        if(findBooks.isEmpty()) {
            return null;
        }

        return findBooks;
    }

    public Page<Book> findBooksByKeyword(String keyword, Pageable pageable) {

        Page<Book> findBooks = bookRepository.findAllByNameContaining(keyword, pageable);

        if(findBooks.isEmpty()) {
            return null;
        }

        return findBooks;

    }

    public void deleteBook(Long bookId) {

        Book findBook = getbookDetail(bookId);
        findBook.setDeleted(true);
        List<BookImg> imgs = findBook.getBookImgList();
        for (BookImg bookImg : imgs) {
            bookImg.setDeleted(true);
        }
        findBook.setBookImgList(imgs);
        bookRepository.save(findBook);
    }

    // 상품 수정
    /*public Long updateBook(BookFormDto bookFormDto, BookImg bookImg) throws IOException {

        // 상품 수정
        Book book = bookRepository.findById(bookFormDto.getId()).orElseThrow(EntityNotFoundException::new);
        book.updateBook(bookFormDto);

        // 상품 이미지 수정


        return book.getId();
    }*/
}
