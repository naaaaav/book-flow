package io.elice.shoppingmall.order.model.dto;

import io.elice.shoppingmall.order.model.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDto {

    private LocalDateTime createdAt;

    private Long orderId;

    private OrderStatus orderStatus;

    private int bookTotalPrice;

    private int shippingPrice;

    private int orderTotalPrice;

    private String orderRequest;

    private String orderSummaryTitle;



}
