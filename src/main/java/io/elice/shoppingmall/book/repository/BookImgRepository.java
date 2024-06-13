package io.elice.shoppingmall.book.repository;

import io.elice.shoppingmall.book.model.Entity.BookImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookImgRepository extends JpaRepository<BookImg, Long> {

}
