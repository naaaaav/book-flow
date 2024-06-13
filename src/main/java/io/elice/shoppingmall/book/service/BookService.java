package io.elice.shoppingmall.book.service;

import io.elice.shoppingmall.book.model.Dto.BookFormDto;
import io.elice.shoppingmall.book.model.Entity.Book;
import io.elice.shoppingmall.book.model.Entity.BookImg;
import io.elice.shoppingmall.book.repository.BookImgRepository;
import io.elice.shoppingmall.book.repository.BookRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Optional;

@Service
@Transactional
@Getter
@Setter
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    //상품 등록
    public Book saveBook(Book book){
        return bookRepository.save(book);
    }

    // 상품 조회
    @Transactional(readOnly = true)
    public Book getbookDetail(Long bookId) {

        Optional<Book> findedBook = bookRepository.findById(bookId);
        //못찾으면 null반환
        if(findedBook.isEmpty()) {
            return null;
        }
        //찾은거 반환
        return findedBook.get();

    }

    //상품 수정

    //상품 삭제


}
