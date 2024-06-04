package io.elice.shoppingmall.order.controller;


import io.elice.shoppingmall.order.model.*;
import io.elice.shoppingmall.order.model.dto.OrderCreateDto;
import io.elice.shoppingmall.order.model.dto.OrderResponseCombinedDto;
import io.elice.shoppingmall.order.model.dto.OrdersResponseDto;
import io.elice.shoppingmall.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserOrderController {

    private final OrderService orderService;
    private final OrderMapper orderMapper;

    @GetMapping("/orders")
    public ResponseEntity<OrdersResponseDto> getOrders() {

        List<Order> orders = orderService.findOrders();
        OrdersResponseDto ordersResponseDto = orderMapper.ordersToOrdersResponseDto(orders);

        return new ResponseEntity<>(ordersResponseDto, HttpStatus.OK);
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<OrderResponseCombinedDto> getOrder(@PathVariable Long orderId) {

        Order order = orderService.findOrder(orderId);
        OrderResponseCombinedDto orderResponseDto = orderMapper.orderToOrderResponseCombinedDto(order);

        return new ResponseEntity<>(orderResponseDto, HttpStatus.OK);
    }

    @PostMapping("/order")
    public ResponseEntity<?> postOrder(@RequestBody @Validated OrderCreateDto orderCreateDto, BindingResult error) {

        if (error.hasErrors()) {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }

        Order requestOrder = orderMapper.orderDtoToOrder(orderCreateDto.getOrderDto());
        OrderDelivery requestOrderDelivery = orderMapper.orderDeliveryDtoToOrderDelivery(orderCreateDto.getOrderDeliveryDto());
        List<OrderItem> requestOrderItems = orderMapper.orderCreateDtoToOrderItems(orderCreateDto);

        Order createdOrder = orderService.creatOrder(requestOrder, requestOrderDelivery, requestOrderItems);

        OrderResponseCombinedDto orderResponseDto = orderMapper.orderToOrderResponseCombinedDto(createdOrder);
        return new ResponseEntity<>(orderResponseDto, HttpStatus.CREATED);

    }

    @DeleteMapping("/order/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderId) {

        orderService.deleteOrder(orderId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @PutMapping("/order/{orderId}")
    public ResponseEntity<OrderResponseCombinedDto> putOrder(@PathVariable Long orderId, @RequestBody OrderCreateDto dto) {

        Order editedOrder = orderService.editOrder(orderId, dto);
        OrderResponseCombinedDto  orderResponseDto = orderMapper.orderToOrderResponseCombinedDto(editedOrder);
        return new ResponseEntity<>(orderResponseDto, HttpStatus.OK);
    }
}
