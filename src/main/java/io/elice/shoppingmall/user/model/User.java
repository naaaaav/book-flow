package io.elice.shoppingmall.user.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column(name = "user_username")
    private String username;

    @Column(name = "user_password")
    private String password;

    @Column(name = "user_roles")
    private String roles;

    @Column(name = "user_name")
    private String name;

    @Column(name = "user_address")
    private String address;

    @Column(name = "is_deleted")
    private boolean idDeleted;

//    @OneToMany(mappedBy = "user")
//    private List<Order> orders;

    @Getter
    public enum Role {
        USER("ROLE_USER","일반 회원"), ADMIN("ROLE_ADMIN","관리자");

        private final String key;
        private final String title;

        Role(String key, String title) {
            this.key = key;
            this.title = title;
        }
    }
}
