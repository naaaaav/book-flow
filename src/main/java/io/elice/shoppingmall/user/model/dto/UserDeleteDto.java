package io.elice.shoppingmall.user.model.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
public class UserDeleteDto {
    @NotBlank(message = "비밀번호를 입력해 주세요.")
    private String password;
}