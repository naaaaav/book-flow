package io.elice.shoppingmall.book.repository;

import io.elice.shoppingmall.book.model.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book,Long> {
    Optional<Book> findByIdAndIsDeletedFalse(Long bookId);
}
