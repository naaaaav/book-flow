package io.elice.shoppingmall.order.model;

import io.elice.shoppingmall.book.model.Entity.Book;
import io.elice.shoppingmall.book.service.BookService;
import io.elice.shoppingmall.order.model.dto.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class OrderMapper {

    protected BookService bookservice;

    @Autowired
    public void setBookService(BookService bookService) {
        this.bookservice = bookService;
    }
    /*Order orderCreateDtoToOrder(OrderCreateDto orderCreateDto);
    OrderDelivery orderCreateDtoToOrderDelivery(OrderCreateDto orderCreateDto);*/
    public abstract Order orderDtoToOrder(OrderDto orderDto);
    public abstract OrderDelivery orderDeliveryDtoToOrderDelivery(OrderDeliveryDto orderDeliveryDto);
    public abstract OrderItemResponseDto orderItemToOrderItemResponseDto(OrderItem orderItem);
    public abstract OrderDeliveryResponseDto orderDeliveryToOrderDeliveryResponseDto(OrderDelivery orderDelivery);
    public abstract OrderResponseDto orderToOrderResponseDto(Order order);

    public OrderResponseCombinedDto orderToOrderResponseCombinedDto(Order order) {

        if (order == null ) {
            return null;
        }

        OrderResponseCombinedDto orderResponseCombinedDto = new OrderResponseCombinedDto();

        orderResponseCombinedDto.setOrder(orderToOrderResponseDto(order));
        orderResponseCombinedDto.setOrderDelivery(orderDeliveryToOrderDeliveryResponseDto(order.getOrderDelivery()));

        List<OrderItemResponseDto> orderItemResponseDtos = new ArrayList<>();
        List<OrderItem> items = order.getOrderItems();
        for (OrderItem item : items) {

            orderItemResponseDtos.add(orderItemToOrderItemResponseDto(item));
        }
        orderResponseCombinedDto.setOrderItems(orderItemResponseDtos);

        return orderResponseCombinedDto;

    }



    public List<OrderItem> orderCreateDtoToOrderItems(OrderCreateDto orderCreateDto) {

        List<OrderItem> orderItems = new ArrayList<>();
        List<OrderItemDto> orderItemDtos = orderCreateDto.getOrderItemDtos();

        for (OrderItemDto dto : orderItemDtos) {

            OrderItem orderItem = new OrderItem();
            Book book = bookservice.getbookDetail(dto.getBookId());

            orderItem.setBook(book);
            orderItem.setOrderItemQuantity(dto.getOrderItemQuantity());

            orderItems.add(orderItem);
        }

        return orderItems;
    }

    public OrdersResponseDto ordersToOrdersResponseDto(List<Order> orders) {
        OrdersResponseDto ordersResponseDto = new OrdersResponseDto();

        for (Order order : orders) {
            ordersResponseDto.getOrderList().add(orderToOrderResponseCombinedDto(order));
        }

        return ordersResponseDto;
    }

    public OrdersPageDto pageToOrdersPageDto(Page<Order> orders) {

        OrdersPageDto ordersPageDto = new OrdersPageDto();

        ordersPageDto.setTotalPages(orders.getTotalPages());
        ordersPageDto.setSize(orders.getSize());
        ordersPageDto.setLast(orders.isLast());
        ordersPageDto.setNumber(orders.getNumber());
        ordersPageDto.setTotalElements(orders.getTotalElements());

        List<Order> orderList = orders.getContent();
        OrdersResponseDto ordersResponseDto = ordersToOrdersResponseDto(orderList);

        ordersPageDto.setOrdersResponseDto(ordersResponseDto);

        return ordersPageDto;
    };
}
