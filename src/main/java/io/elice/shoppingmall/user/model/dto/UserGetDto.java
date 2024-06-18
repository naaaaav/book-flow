package io.elice.shoppingmall.user.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserGetDto {
    private String username;
    private String name;
    private String phoneNumber;
    private String address;
}
