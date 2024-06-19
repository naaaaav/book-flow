package io.elice.shoppingmall.order.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.elice.shoppingmall.audit.BaseEntity;
import io.elice.shoppingmall.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Order extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    private int bookTotalPrice;

    private int shippingPrice;

    @Column(nullable = false)
    private int orderTotalPrice;

    @Column(length = 50)
    private String orderRequest;

    @Column(length = 200)
    private String orderSummaryTitle;

    private boolean isDeleted;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "order_delivery_id")
    private OrderDelivery orderDelivery;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
