package io.elice.shoppingmall.order.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public enum OrderStatus {
    PAYMENT_COMPLETED,
    SHIPPING,
    DELIVERED,
    PREPARING_PRODUCT,
    PURCHASE_CONFIRMATION;
}
