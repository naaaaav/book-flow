package io.elice.shoppingmall.order.service;


import io.elice.shoppingmall.book.model.Entity.Book;
import io.elice.shoppingmall.book.service.BookService;
import io.elice.shoppingmall.order.exception.*;
import io.elice.shoppingmall.order.model.*;
import io.elice.shoppingmall.order.model.dto.OrderCreateDto;
import io.elice.shoppingmall.order.model.dto.OrderDeliveryEditDto;
import io.elice.shoppingmall.order.repository.OrderDeliveryRepository;
import io.elice.shoppingmall.order.repository.OrderItemRepository;
import io.elice.shoppingmall.order.repository.OrderRepository;
import io.elice.shoppingmall.user.model.User;
import io.elice.shoppingmall.user.model.dto.UserPostDto;
import io.elice.shoppingmall.user.repository.UserRepository;
import io.elice.shoppingmall.user.service.AuthService;
import io.elice.shoppingmall.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderDeliveryRepository orderDeliveryRepository;
    private final OrderMapper orderMapper;
    private final AuthService authService;
    private final BookService bookService;
    private final UserRepository userRepository;

   @Transactional
    public Order creatOrder(Order requestOrder, OrderDelivery requestOrderDelivery, List<OrderItem> requestOrderItems) {

        User currentUser = authService.getCurrentUser();
        requestOrder.setUser(currentUser);

        Order savedOrder = orderRepository.save(requestOrder);
        savedOrder.setOrderStatus(OrderStatus.PAYMENT_COMPLETED);

        OrderDelivery savedOrderDelivery = orderDeliveryRepository.save(requestOrderDelivery);
        savedOrder.setOrderDelivery(savedOrderDelivery);

        if (StringUtils.isEmpty(currentUser.getOrderDeliveryPostalCode())   ||
                StringUtils.isEmpty(currentUser.getOrderDeliveryAddress1()) ||
                StringUtils.isEmpty(currentUser.getOrderDeliveryAddress2())) {

            currentUser.setOrderDeliveryPostalCode(savedOrderDelivery.getOrderDeliveryPostalCode());
            currentUser.setOrderDeliveryAddress1(savedOrderDelivery.getOrderDeliveryAddress1());
            currentUser.setOrderDeliveryAddress2(savedOrderDelivery.getOrderDeliveryAddress2());
            userRepository.save(currentUser);
        }

        int bookTotalPrice = 0;

        for (OrderItem orderItem : requestOrderItems) {

            orderItem.setOrder(savedOrder);
            orderItem.setOrderItemPrice(orderItem.getBook().getPrice());

            if (orderItem.getBook().getStock() < orderItem.getOrderItemQuantity()) {

                throw new NoStockException(OrderErrorMessages.NO_STOCK);
            }
            Book book = orderItem.getBook();
            book.setStock(book.getStock() - orderItem.getOrderItemQuantity());
            bookService.saveBook(book);

            int totalPrice = orderItem.getOrderItemPrice() * orderItem.getOrderItemQuantity();
            orderItem.setOrderItemTotalPrice(totalPrice);
            bookTotalPrice += totalPrice;
        }

        List<OrderItem> savedOrderItems = orderItemRepository.saveAll(requestOrderItems);
        savedOrder.setBookTotalPrice(bookTotalPrice);
        int shippingPrice = 3000;
        if (bookTotalPrice >= 50000) {
            shippingPrice = 0;
        }
        savedOrder.setShippingPrice(shippingPrice);
        savedOrder.setOrderTotalPrice(bookTotalPrice + shippingPrice);
        savedOrder.setOrderItems(savedOrderItems);

        String orderSummaryTitle = savedOrderItems.get(0).getBook().getName();

        int itemsCount = savedOrderItems.size();
        if (itemsCount > 1) {
            orderSummaryTitle += "외 " + (itemsCount - 1) + " 건";
        }

       savedOrder.setOrderSummaryTitle(orderSummaryTitle);

       savedOrder = orderRepository.save(savedOrder);

        return savedOrder;
    }

    /*public List<Order> findOrders() {

       User currentUser = getCurrentUser();
       Optional<List<Order>> orders = orderRepository.findAllByUserIdAndIsDeletedFalse(currentUser.getId());

       if (orders.isEmpty()) {
           throw new NoOrdersException(OrderErrorMessages.NO_ORDERS_FOUND);
       }

       return orders.get();
    }*/

    public Page<Order> findOrders(Pageable pageable) {

        User currentUser = authService.getCurrentUser();

        Page<Order> orders = orderRepository.findAllByUserIdAndIsDeletedFalse(currentUser.getId(), pageable);

        if (orders.isEmpty()) {
            throw new NoOrdersException(OrderErrorMessages.NO_ORDERS_FOUND);
        }

        return orders;
    }

    public Order findOrder(Long id) {

       Long currentUserId = authService.getCurrentUser().getId();
       Optional<Order> foundOrder = orderRepository.findByOrderIdAndIsDeletedFalse(id);

       if (foundOrder.isEmpty()) {
           throw new OrderNotFoundException(OrderErrorMessages.NO_ORDERS_FOUND);
       }

       Long foundOrderUserId = foundOrder.get().getUser().getId();

       if (!Objects.equals(currentUserId, foundOrderUserId)) {
           throw new OrderAccessdeniedException(OrderErrorMessages.ACCESS_DENIED);
       }

       return foundOrder.get();
    }

    @Transactional
    public void deleteOrder(Long orderId) {

        Long currentUserId = authService.getCurrentUser().getId();

       Order foundOrder = findOrder(orderId);

       Long foundOrderUserId = foundOrder.getUser().getId();

       if (!Objects.equals(currentUserId, foundOrderUserId)) {
           throw new OrderAccessdeniedException(OrderErrorMessages.ACCESS_DENIED);
       }

       OrderStatus status = foundOrder.getOrderStatus();

       if (status.equals(OrderStatus.SHIPPING) || status.equals(OrderStatus.DELIVERED)) {
           throw new OrderAccessdeniedException(OrderErrorMessages.ACCESS_DENIED);
       }

       foundOrder.setDeleted(true);
       foundOrder.getOrderDelivery().setDeleted(true);
       for (OrderItem item : foundOrder.getOrderItems()) {
           Book book = item.getBook();
           int stock = book.getStock();
           int orderItemQuantity = item.getOrderItemQuantity();
           book.setStock(stock + orderItemQuantity);
           bookService.saveBook(book);
           item.setDeleted(true);
       }

       orderRepository.save(foundOrder);
    }

    @Transactional
    public Order editOrder(Long orderId, OrderCreateDto dto) {

       Order oldOrder = findOrder(orderId);
       List<OrderItem> oldItems = oldOrder.getOrderItems();
       List<OrderItem> updateRequestOrderItems = orderMapper.orderCreateDtoToOrderItems(dto);

       Long currentUserId = authService.getCurrentUser().getId();
       Long oldOrderUserId = oldOrder.getUser().getId();

       if (!Objects.equals(currentUserId, oldOrderUserId)) {
           throw new OrderAccessdeniedException(OrderErrorMessages.ACCESS_DENIED);
       }

       OrderStatus status = oldOrder.getOrderStatus();

       if (status.equals(OrderStatus.DELIVERED) || status.equals(OrderStatus.SHIPPING)) {
           throw new OrderAccessdeniedException(OrderErrorMessages.ACCESS_DENIED);
       }

       for (OrderItem newItem : updateRequestOrderItems) {

           for (OrderItem oldItem : oldItems) {

               boolean isMatch = Objects.equals(newItem.getBook().getId(), oldItem.getBook().getId());
               if (isMatch) {
                   oldItem.setOrderItemQuantity(newItem.getOrderItemQuantity());
                   break;
               }
           }
       }

       int newOrderTotalPrice = 0;
       for (OrderItem item : oldItems) {
           int totalPrice = 0;
           totalPrice = item.getOrderItemPrice() * item.getOrderItemQuantity();
           newOrderTotalPrice += totalPrice;
           item.setOrderItemTotalPrice(totalPrice);
       }
       List<OrderItem> updatedOrderItems = orderItemRepository.saveAll(oldItems);
       oldOrder.setOrderItems(updatedOrderItems);

       OrderDelivery oldOrderDelivery = oldOrder.getOrderDelivery();
       OrderDelivery updateRequestOrderDelivery = orderMapper.orderDeliveryDtoToOrderDelivery(dto.getOrderDeliveryDto());

       oldOrderDelivery.setOrderDeliveryReceiverName(updateRequestOrderDelivery.getOrderDeliveryReceiverName());
       oldOrderDelivery.setOrderDeliveryReceiverPhoneNumber(updateRequestOrderDelivery.getOrderDeliveryReceiverPhoneNumber());
       oldOrderDelivery.setOrderDeliveryPostalCode(updateRequestOrderDelivery.getOrderDeliveryPostalCode());
       oldOrderDelivery.setOrderDeliveryAddress1(updateRequestOrderDelivery.getOrderDeliveryAddress1());
       oldOrderDelivery.setOrderDeliveryAddress2(updateRequestOrderDelivery.getOrderDeliveryAddress2());

       OrderDelivery updatedOrderDelivery = orderDeliveryRepository.save(oldOrderDelivery);
       oldOrder.setOrderDelivery(updatedOrderDelivery);

       oldOrder.setOrderRequest(dto.getOrderDto().getOrderRequest());

       Order updatedOrder = orderRepository.save(oldOrder);

       return updatedOrder;
    }

    @Transactional
    public Order editOrder(Long orderId, OrderDeliveryEditDto dto) {

        Order foundOrder = findOrder(orderId);

        Long foundOrderUserId = foundOrder.getUser().getId();
        Long currentUserId = authService.getCurrentUser().getId();

        if (!Objects.equals(foundOrderUserId, currentUserId)) {
            throw new OrderAccessdeniedException(OrderErrorMessages.ACCESS_DENIED);
        }

        OrderDelivery oldOrderDelivery = foundOrder.getOrderDelivery();

        oldOrderDelivery.setOrderDeliveryReceiverName(dto.getName());
        oldOrderDelivery.setOrderDeliveryReceiverPhoneNumber(dto.getPhoneNumber());
        oldOrderDelivery.setOrderDeliveryAddress1(dto.getAddress1());
        oldOrderDelivery.setOrderDeliveryAddress2(dto.getAddress2());
        foundOrder.setOrderRequest(dto.getOrderRequest());

        Order updatedOrder = orderRepository.save(foundOrder);

        return updatedOrder;
    }


    /*public List<Order> findOrdersByAdmin() {

        List<Order> orders = orderRepository.findAllByIsDeletedFalse();

        if (orders.isEmpty()) {
            throw new NoOrdersException(OrderErrorMessages.NO_ORDERS_FOUND);
        }

        return orders;
    }*/

    public Page<Order> findOrdersByAdmin(Pageable pageable) {

        Page<Order> orders = orderRepository.findAllByIsDeletedFalseAndUserIsDeletedFalse(pageable);

        if (orders.isEmpty()) {
            throw new NoOrdersException(OrderErrorMessages.NO_ORDERS_FOUND);
        }

        return orders;
    }

    public Order findOrderByAdmin(Long id) {

        Optional<Order> foundOrder = orderRepository.findByOrderIdAndIsDeletedFalse(id);

        if (foundOrder.isEmpty()) {
            throw new OrderNotFoundException(OrderErrorMessages.NO_ORDERS_FOUND);
        }

        return foundOrder.get();
    }

    @Transactional
    public void deleteOrderByAdmin(Long orderId) {

        Order foundOrder = findOrderByAdmin(orderId);

        OrderStatus status = foundOrder.getOrderStatus();

        if (status.equals(OrderStatus.SHIPPING) || status.equals(OrderStatus.DELIVERED)) {
            throw new OrderAccessdeniedException(OrderErrorMessages.ACCESS_DENIED);
        }

        foundOrder.setDeleted(true);
        foundOrder.getOrderDelivery().setDeleted(true);
        for (OrderItem item : foundOrder.getOrderItems()) {
            item.setDeleted(true);
        }

        orderRepository.save(foundOrder);
    }

    @Transactional
    public void editOrderStatusByAdmin(Long orderId, OrderStatus orderStatus) {

        Order foundOrder = findOrderByAdmin(orderId);
        foundOrder.setOrderStatus(orderStatus);
    }
}
