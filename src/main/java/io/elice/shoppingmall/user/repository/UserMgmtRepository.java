package io.elice.shoppingmall.user.repository;

import io.elice.shoppingmall.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserMgmtRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}