package io.elice.shoppingmall.order.repository;

import io.elice.shoppingmall.order.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findByOrderIdAndIsDeletedFalse(long orderId);

    Page<Order> findAllByIsDeletedFalse(Pageable pageable);

    Page<Order> findAllByUserIdAndIsDeletedFalse(Long id, Pageable pageable);

    Page<Order> findAllByIsDeletedFalseAndUserIsDeletedFalse(Pageable pageable);
}
