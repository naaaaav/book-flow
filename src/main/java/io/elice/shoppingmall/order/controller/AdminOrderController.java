package io.elice.shoppingmall.order.controller;

import io.elice.shoppingmall.order.model.Order;
import io.elice.shoppingmall.order.model.OrderMapper;
import io.elice.shoppingmall.order.model.OrderStatus;
import io.elice.shoppingmall.order.model.dto.OrderResponseCombinedDto;
import io.elice.shoppingmall.order.model.dto.OrderStatusDto;
import io.elice.shoppingmall.order.model.dto.OrdersPageDto;
import io.elice.shoppingmall.order.model.dto.OrdersResponseDto;
import io.elice.shoppingmall.order.repository.OrderRepository;
import io.elice.shoppingmall.order.service.OrderService;
import io.elice.shoppingmall.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final AuthService authService;

    @GetMapping("/check")
    public ResponseEntity<HttpStatus> adminCheck() {
        if (authService.getCurrentUser().getRole().equals("ROLE_ADMIN")) {
            return  new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    /*@GetMapping("/orders")
    public ResponseEntity<OrdersResponseDto> getOrdersByAdmin() {

        List<Order> foundOrders = orderService.findOrdersByAdmin();
        OrdersResponseDto orders = orderMapper.ordersToOrdersResponseDto(foundOrders);

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }*/

    @GetMapping("/orders")
    public ResponseEntity<OrdersPageDto> getOrdersByAdmin(@PageableDefault(page = 0, size = 10,sort = "orderId", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<Order> orders = orderService.findOrdersByAdmin(pageable);
        OrdersPageDto ordersPageDto = orderMapper.pageToOrdersPageDto(orders);;

        return new ResponseEntity<>(ordersPageDto, HttpStatus.OK);
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<OrderResponseCombinedDto> getOrderByAdmin(@PathVariable Long orderId) {

        Order foundOrder = orderService.findOrderByAdmin(orderId);
        OrderResponseCombinedDto orderResponseCombinedDto = orderMapper.orderToOrderResponseCombinedDto(foundOrder);

        return new ResponseEntity<>(orderResponseCombinedDto, HttpStatus.OK);
    }

    @DeleteMapping("/order/{orderId}")
    public ResponseEntity<HttpStatus> deleteOrderByAdmin(@PathVariable Long orderId) {

        orderService.deleteOrderByAdmin(orderId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/order/{orderId}")
    public ResponseEntity<HttpStatus> putOrderStatusByAdmin(@PathVariable Long orderId, @RequestBody OrderStatusDto orderStatusDto) {

        OrderStatus orderStatus = orderStatusDto.getOrderStatus();

        orderService.editOrderStatusByAdmin(orderId, orderStatus);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
