package io.elice.shoppingmall.user.repository;

import io.elice.shoppingmall.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
