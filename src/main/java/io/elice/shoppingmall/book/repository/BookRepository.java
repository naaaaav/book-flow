package io.elice.shoppingmall.book.repository;

import io.elice.shoppingmall.book.model.Entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book,Long> {

    Optional<Book> findByIdAndIsDeletedFalse(Long bookId);

    Page<Book> findAllByCategoryIdAndIsDeletedFalse(Integer categoryId, Pageable pageable);

    List<Book> findAllByName(String keyword);
}
