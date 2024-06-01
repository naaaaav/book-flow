package io.elice.shoppingmall.category.service;

import io.elice.shoppingmall.category.model.BookCategoryMapper;
import io.elice.shoppingmall.category.repository.BookCategoryMapperRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookCategoryMapperService {

    private final BookCategoryMapperRepository bookCategoryMapperRepository;

    public BookCategoryMapperService(BookCategoryMapperRepository bookCategoryMapperRepository) {
        this.bookCategoryMapperRepository = bookCategoryMapperRepository;
    }

    public List<BookCategoryMapper> getAllBookCategoryMappers() {
        return bookCategoryMapperRepository.findAll();
    }

    public BookCategoryMapper getBookCategoryMapperById(Integer id) {
        return bookCategoryMapperRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BookCategoryMapper not found"));
    }

    public BookCategoryMapper createBookCategoryMapper(BookCategoryMapper bookCategoryMapper) {
        return bookCategoryMapperRepository.save(bookCategoryMapper);
    }

    public BookCategoryMapper updateBookCategoryMapper(Integer id, BookCategoryMapper bookCategoryMapper) {
        BookCategoryMapper existingBookCategoryMapper = getBookCategoryMapperById(id);
        existingBookCategoryMapper.setBookId(bookCategoryMapper.getBookId());
        existingBookCategoryMapper.setCategory(bookCategoryMapper.getCategory());
        existingBookCategoryMapper.setIsDeleted(bookCategoryMapper.getIsDeleted());
        return bookCategoryMapperRepository.save(existingBookCategoryMapper);
    }

    public void deleteBookCategoryMapper(Integer id) {
        BookCategoryMapper bookCategoryMapper = getBookCategoryMapperById(id);
        bookCategoryMapper.setIsDeleted(true);
        bookCategoryMapperRepository.save(bookCategoryMapper);
    }
}
