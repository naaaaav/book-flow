package io.elice.shoppingmall.category.repository;

import io.elice.shoppingmall.category.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByParentCategoryId(Integer parentId);

    Optional<Category> findByIdAndIsDeletedFalse(Integer id);

    List<Category> findAllByIsDeletedFalse();
}
