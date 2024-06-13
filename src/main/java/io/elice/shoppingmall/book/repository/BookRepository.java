package io.elice.shoppingmall.book.repository;

import io.elice.shoppingmall.book.model.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book,Long> {
}
