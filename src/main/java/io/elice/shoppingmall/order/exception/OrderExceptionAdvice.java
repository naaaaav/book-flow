package io.elice.shoppingmall.order.exception;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.print.DocFlavor;

@RestControllerAdvice
public class OrderExceptionAdvice {

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public OrderApiError exceptionHandle(NoOrdersException e) {

        return new OrderApiError(e.getOrderErrorMessages().getMessage());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public OrderApiError exceptionHandle(OrderNotFoundException e) {

        return new OrderApiError(e.getOrderErrorMessages().getMessage());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public OrderApiError exceptionHandle(OrderAccessdeniedException e) {

        return new OrderApiError(e.getOrderErrorMessages().getMessage());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public OrderApiError exceptionHandle(NoStockException e) {

        return new OrderApiError(e.getOrderErrorMessages().getMessage());
    }
}
