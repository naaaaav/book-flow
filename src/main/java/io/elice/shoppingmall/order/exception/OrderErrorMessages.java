package io.elice.shoppingmall.order.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum OrderErrorMessages {

    NO_ORDERS_FOUND("주문 내역이 없습니다."),
    ACCESS_DENIED("잘못된 요청입니다."),
    NO_STOCK("재고가 부족합니다.");

    private String message;
}
