package io.elice.shoppingmall.order.model;

import io.elice.shoppingmall.order.model.dto.OrderDeliveryDto;
import io.elice.shoppingmall.order.model.dto.OrderDeliveryResponseDto;
import io.elice.shoppingmall.order.model.dto.OrderDto;
import io.elice.shoppingmall.order.model.dto.OrderItemResponseDto;
import io.elice.shoppingmall.order.model.dto.OrderResponseDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-06-08T13:27:19+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.2 (Oracle Corporation)"
)
@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public Order orderDtoToOrder(OrderDto orderDto) {
        if ( orderDto == null ) {
            return null;
        }

        Order order = new Order();

        order.setOrderRequest( orderDto.getOrderRequest() );

        return order;
    }

    @Override
    public OrderDelivery orderDeliveryDtoToOrderDelivery(OrderDeliveryDto orderDeliveryDto) {
        if ( orderDeliveryDto == null ) {
            return null;
        }

        OrderDelivery orderDelivery = new OrderDelivery();

        orderDelivery.setOrderDeliveryReceiverName( orderDeliveryDto.getOrderDeliveryReceiverName() );
        orderDelivery.setOrderDeliveryReceiverPhoneNumber( orderDeliveryDto.getOrderDeliveryReceiverPhoneNumber() );
        orderDelivery.setOrderDeliveryPostalCode( orderDeliveryDto.getOrderDeliveryPostalCode() );
        orderDelivery.setOrderDeliveryAddress1( orderDeliveryDto.getOrderDeliveryAddress1() );
        orderDelivery.setOrderDeliveryAddress2( orderDeliveryDto.getOrderDeliveryAddress2() );

        return orderDelivery;
    }

    @Override
    public OrderItemResponseDto orderItemToOrderItemResponseDto(OrderItem orderItem) {
        if ( orderItem == null ) {
            return null;
        }

        OrderItemResponseDto orderItemResponseDto = new OrderItemResponseDto();

        orderItemResponseDto.setOrderItemPrice( orderItem.getOrderItemPrice() );
        orderItemResponseDto.setOrderItemTotalPrice( orderItem.getOrderItemTotalPrice() );
        orderItemResponseDto.setOrderItemQuantity( orderItem.getOrderItemQuantity() );
        orderItemResponseDto.setBook( orderItem.getBook() );

        return orderItemResponseDto;
    }

    @Override
    public OrderDeliveryResponseDto orderDeliveryToOrderDeliveryResponseDto(OrderDelivery orderDelivery) {
        if ( orderDelivery == null ) {
            return null;
        }

        OrderDeliveryResponseDto orderDeliveryResponseDto = new OrderDeliveryResponseDto();

        orderDeliveryResponseDto.setOrderDeliveryReceiverName( orderDelivery.getOrderDeliveryReceiverName() );
        orderDeliveryResponseDto.setOrderDeliveryReceiverPhoneNumber( orderDelivery.getOrderDeliveryReceiverPhoneNumber() );
        orderDeliveryResponseDto.setOrderDeliveryPostalCode( orderDelivery.getOrderDeliveryPostalCode() );
        orderDeliveryResponseDto.setOrderDeliveryAddress1( orderDelivery.getOrderDeliveryAddress1() );
        orderDeliveryResponseDto.setOrderDeliveryAddress2( orderDelivery.getOrderDeliveryAddress2() );

        return orderDeliveryResponseDto;
    }

    @Override
    public OrderResponseDto orderToOrderResponseDto(Order order) {
        if ( order == null ) {
            return null;
        }

        OrderResponseDto orderResponseDto = new OrderResponseDto();

        orderResponseDto.setCreatedAt( order.getCreatedAt() );
        orderResponseDto.setOrderId( order.getOrderId() );
        orderResponseDto.setOrderStatus( order.getOrderStatus() );
        orderResponseDto.setOrderTotalPrice( order.getOrderTotalPrice() );
        orderResponseDto.setOrderRequest( order.getOrderRequest() );
        orderResponseDto.setOrderSummaryTitle( order.getOrderSummaryTitle() );

        return orderResponseDto;
    }
}
