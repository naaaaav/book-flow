package io.elice.shoppingmall.order.exception;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-06-08T13:27:19+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.2 (Oracle Corporation)"
)
@Component
public class OrderExceptionMapperImpl implements OrderExceptionMapper {

    @Override
    public OrderExceptionResponseDto noOrdersExceptionToOrderExceptionResponseDto(NoOrdersException e) {
        if ( e == null ) {
            return null;
        }

        OrderExceptionResponseDto orderExceptionResponseDto = new OrderExceptionResponseDto();

        orderExceptionResponseDto.setOrderErrorMessages( e.getOrderErrorMessages() );

        return orderExceptionResponseDto;
    }

    @Override
    public OrderExceptionResponseDto orderAccessDeniedExceptionToOrderExceptionResponseDto(OrderAccessdeniedException e) {
        if ( e == null ) {
            return null;
        }

        OrderExceptionResponseDto orderExceptionResponseDto = new OrderExceptionResponseDto();

        orderExceptionResponseDto.setOrderErrorMessages( e.getOrderErrorMessages() );

        return orderExceptionResponseDto;
    }

    @Override
    public OrderExceptionResponseDto orderNotFoundExceptionToORderExceptionResponseDto(OrderNotFoundException e) {
        if ( e == null ) {
            return null;
        }

        OrderExceptionResponseDto orderExceptionResponseDto = new OrderExceptionResponseDto();

        orderExceptionResponseDto.setOrderErrorMessages( e.getOrderErrorMessages() );

        return orderExceptionResponseDto;
    }
}
