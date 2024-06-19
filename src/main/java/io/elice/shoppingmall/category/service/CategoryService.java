package io.elice.shoppingmall.category.service;

import io.elice.shoppingmall.book.model.Entity.Book;
import io.elice.shoppingmall.book.service.BookService;
import io.elice.shoppingmall.category.model.Category;
import io.elice.shoppingmall.category.repository.CategoryRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final BookService bookService;

    public CategoryService(CategoryRepository categoryRepository, BookService bookService) {
        this.categoryRepository = categoryRepository;
        this.bookService = bookService;
    }

    // 일반 사용자용 메소드
    public List<Category> getAllCategories() {
        return categoryRepository.findAllByIsDeletedFalse();
    }

    public Category getCategoryById(Integer id) {
        return categoryRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    // 관리자용 메소드
    @PreAuthorize("hasRole('ADMIN')")
    public Category createCategory(Category category) {
        if (category.getParentCategory() != null) {
            Category parentCategory = getCategoryById(category.getParentCategory().getId());
            category.setParentCategory(parentCategory);
        }
        return categoryRepository.save(category);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Category updateCategory(Integer id, Category category) {
        Category existingCategory = getCategoryById(id);
        existingCategory.setCategoryName(category.getCategoryName());
        existingCategory.setIsDeleted(category.getIsDeleted());
        if (category.getParentCategory() != null) {
            existingCategory.setParentCategory(getCategoryById(category.getParentCategory().getId()));
        }
        return categoryRepository.save(existingCategory);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public void deleteCategory(Integer id) {
        Category category = getCategoryById(id);
        List<Book> books = bookService.findBooksByCategoryId(id);
        if (books!=null) {
            for (Book book : books) {
                bookService.deleteBook(book.getId());
            }
        }
        deleteSubcategories(category);
        category.setIsDeleted(true);
        categoryRepository.save(category);
    }

    @Transactional
    public void deleteSubcategories(Category category) {
        List<Category> subcategories = category.getSubCategories();
        for (Category subcategory : subcategories) {
            List<Book> books = bookService.findBooksByCategoryId(subcategory.getId());
            if (books!=null) {
                for (Book book : books) {
                    bookService.deleteBook(book.getId());
                }
            }
            deleteSubcategories(subcategory);
            subcategory.setIsDeleted(true);
            categoryRepository.save(subcategory);
        }
    }
}
