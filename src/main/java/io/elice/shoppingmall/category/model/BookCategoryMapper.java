package io.elice.shoppingmall.category.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "book_category_mapper")
@Data
public class BookCategoryMapper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookCategoryMapperId;

    private Integer bookId;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
//    private Integer categoryId;
    private Category category;

    private Boolean isDeleted;

}
