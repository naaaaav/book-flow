package io.elice.shoppingmall.book.service;

import io.elice.shoppingmall.book.model.Entity.Book;
import io.elice.shoppingmall.book.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    //책 등록
    public Book saveBook(Book book){

        return bookRepository.save(book);
    }

    // 상품 조회
    @Transactional(readOnly = true)
    public Book getbookDetail(Long bookId) {

        Optional<Book> findBook = bookRepository.findByIdAndIsDeletedFalse(bookId);
        //못찾으면 null반환
        if(findBook.isEmpty()) {
            return null;
        }
        //찾은거 반환
        return findBook.get();

    }

    public List<Book> findBooksByCategoryId(Integer categoryId, Pageable pageable) {

        List<Book> findBooks = bookRepository.findAllByCategoryCategoryIdAndIsDeletedFalse(categoryId, pageable);

        if(findBooks.isEmpty()) {
            return null;
        }

        return findBooks;
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
