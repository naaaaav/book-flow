package io.elice.shoppingmall.order.controller;


import io.elice.shoppingmall.order.model.Order;
import io.elice.shoppingmall.order.model.OrderDelivery;
import io.elice.shoppingmall.order.model.OrderItem;
import io.elice.shoppingmall.order.model.OrderMapper;
import io.elice.shoppingmall.order.model.dto.OrderCreateDto;
import io.elice.shoppingmall.order.model.dto.OrderDeliveryEditDto;
import io.elice.shoppingmall.order.model.dto.OrderResponseCombinedDto;
import io.elice.shoppingmall.order.model.dto.OrdersPageDto;
import io.elice.shoppingmall.order.service.OrderService;
import io.elice.shoppingmall.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserOrderController {

    private final OrderService orderService;
    private final OrderMapper orderMapper;
    private final AuthService authService;

    /*@GetMapping("/orders")
    public ResponseEntity<OrdersResponseDto> getOrders() {

        List<Order> orders = orderService.findOrders();
        OrdersResponseDto ordersResponseDto = orderMapper.ordersToOrdersResponseDto(orders);

        return new ResponseEntity<>(ordersResponseDto, HttpStatus.OK);
    }*/

    @GetMapping("/orders")
    public ResponseEntity<OrdersPageDto> getOrders(@PageableDefault(page = 0, size = 10,sort = "orderId", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<Order> orders = orderService.findOrders(pageable);
        OrdersPageDto ordersPageDto = orderMapper.pageToOrdersPageDto(orders);;

        return new ResponseEntity<>(ordersPageDto, HttpStatus.OK);
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
    public ResponseEntity<HttpStatus> deleteOrder(@PathVariable Long orderId) {

        orderService.deleteOrder(orderId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @PutMapping("/order/{orderId}")
    public ResponseEntity<?> putOrder(@PathVariable Long orderId, @RequestBody @Validated OrderDeliveryEditDto dto, BindingResult error) {

        if (error.hasErrors()) {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }

        Order editedOrder = orderService.editOrder(orderId, dto);
        OrderResponseCombinedDto  orderResponseDto = orderMapper.orderToOrderResponseCombinedDto(editedOrder);
        return new ResponseEntity<>(orderResponseDto, HttpStatus.OK);
    }

    @GetMapping("/check")
    public ResponseEntity<HttpStatus> userCheck() {
        if (authService.getCurrentUser().getRole().equals("ROLE_USER") || authService.getCurrentUser().getRole().equals("ROLE_ADMIN")) {
            return  new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
