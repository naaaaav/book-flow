package io.elice.shoppingmall.order.model;

import io.elice.shoppingmall.audit.BaseEntity;
import io.elice.shoppingmall.user.model.User;
import jakarta.persistence.*;

@Entity
public class OrderItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    private int orderItemPrice;
    private int orderItemTotalPrice;
    private int orderItemQuantity;
    private boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

//    @OneToOne
//    @JoinColumn(name = "book_id")
//    private Book book;
}
