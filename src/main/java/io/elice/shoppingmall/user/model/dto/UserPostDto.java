package io.elice.shoppingmall.user.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPostDto {
    private String password;
    private String name;
    @Pattern(regexp = "\\d+", message = "전화번호는 숫자만 입력 가능합니다.")
    private String phoneNumber;
    private String orderDeliveryPostalCode;
    private String orderDeliveryAddress1;
    private String orderDeliveryAddress2;
}
