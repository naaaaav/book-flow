package io.elice.shoppingmall.order.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@Setter
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class OrderAccessdeniedException extends RuntimeException {

    private OrderErrorMessages orderErrorMessages;

    public OrderAccessdeniedException(OrderErrorMessages messages) {
        super(messages.getMessage());
        this.orderErrorMessages = messages;
    }
}
