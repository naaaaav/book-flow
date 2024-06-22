package io.elice.shoppingmall.user.model;

import io.elice.shoppingmall.audit.BaseEntity;
import io.elice.shoppingmall.order.model.Order;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_username", unique = true)
    private String username;

    @Column(name = "user_password")
    private String password;

    @Column(name = "user_role")
    private String role;

    @Column(name = "user_name")
    private String name;

    @Column(name = "user_phone_number")
    private String phoneNumber;

    @Column(name = "user_order_deliveryPostalCode")
    private String orderDeliveryPostalCode;

    @Column(name = "user_order_delivery_address1")
    private String orderDeliveryAddress1;

    @Column(name = "user_order_delivery_address2")
    private String orderDeliveryAddress2;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    @Getter
    public enum Role {
        USER("ROLE_USER","일반 사용자"), ADMIN("ROLE_ADMIN","관리자");

        private final String key;
        private final String title;

        Role(String key, String title) {
            this.key = key;
            this.title = title;
        }
    }
}
