package io.elice.shoppingmall.book.model.Entity;

import io.elice.shoppingmall.audit.BaseEntity;
import io.elice.shoppingmall.book.exception.OutOfStockException;
import io.elice.shoppingmall.book.model.Dto.BookFormDto;
import io.elice.shoppingmall.category.model.Category;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Table(name = "book")
@Getter
@Setter
@ToString
public class Book extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "book_id", nullable = false)
    private Long id;

    @Column(name = "book_name", nullable = false, length = 50)
    private String name;

    @Column(name = "book_price", nullable = false)
    private int price;

    @Column(name = "book_stock", nullable = false)
    private int stock;

    @Column(name = "book_date", nullable = false)
    private String date;

    @Column(name = "book_detail", nullable = false)
    private String detail;

    @Column(name = "book_img", nullable = false)
    private String img;

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "catecory_id")
    private Category category;


    //상품 업데이트
    public void updateBook(BookFormDto bookFormDto) {
        this.name = bookFormDto.getBookName();
        this.price = bookFormDto.getPrice();
        this.stock = bookFormDto.getStock();
        this.detail = bookFormDto.getBookDetail();
    }

    //상품 재고 관리
    public void removeStock(int stock) {

        int restStock = this.stock - stock;
        if (restStock < 0) {
            throw new OutOfStockException("상품의 재고가 부족합니다. (현재 재고 수량: " + this.stock + ")");
        }
        this.stock = restStock;
    }

    public void addStock(int stock) {
        this.stock += stock;
    }
}
