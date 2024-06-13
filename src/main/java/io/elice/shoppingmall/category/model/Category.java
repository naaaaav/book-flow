package io.elice.shoppingmall.category.model;

import io.elice.shoppingmall.book.model.Entity.Book;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "category")
@Data
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryId;

    private String categoryName;

    @Column(name = "category_parent_category_id")
    private Integer parentCategoryId;

    private Boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "parentCategoryId", insertable = false, updatable = false)
    private Category parentCategory;

    @OneToMany(mappedBy = "parentCategory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Category> subCategories;
}
