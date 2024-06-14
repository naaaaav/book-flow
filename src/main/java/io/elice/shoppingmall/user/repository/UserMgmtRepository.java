package io.elice.shoppingmall.user.repository;

import io.elice.shoppingmall.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMgmtRepository extends JpaRepository<User, Long> {
}