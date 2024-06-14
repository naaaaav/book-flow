package io.elice.shoppingmall.user.repository;

import io.elice.shoppingmall.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminRepository extends JpaRepository<User, Long> {
    Page<User> findAllByIsDeletedFalse(Pageable pageable);
    Long countByIsDeletedFalseAndRole(String role);
    List<User> findAllByIsDeletedFalse();


    //JPQL
    // @Query(value = "select * from USER where is_deleted = :is_deleted", nativeQuery = true)
    // List<User> findAllByIsDeleted(@Param("is_deleted") boolean isDeleted);
    //
    // @Query(value = "select count(*) from USER where is_deleted = false and user_role = :role", nativeQuery = true)
    // Long totalCount(@Param("role") String role);
}
