package io.elice.shoppingmall.order.model;

import io.elice.shoppingmall.audit.BaseEntity;
import io.elice.shoppingmall.user.model.User;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private String orderStatus;
    private int orderTotalPrice;
    private String orderRequest;
    private String orderSummaryTitle;
    private boolean isDeleted;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
