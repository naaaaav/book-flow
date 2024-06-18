package io.elice.shoppingmall.book.service;

import io.elice.shoppingmall.book.model.Dto.BookFormDto;
import io.elice.shoppingmall.book.model.Entity.Book;
import io.elice.shoppingmall.book.model.Entity.BookImg;
import io.elice.shoppingmall.book.repository.BookImgRepository;
import io.elice.shoppingmall.book.repository.BookRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Transactional
public class BookImgService {

    private final BookImgRepository bookImgRepository;


    public BookImg save(BookImg bookImg) {

        return bookImgRepository.save(bookImg);
    }
}
