package io.elice.shoppingmall.user.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserMgmtDto {
    @NotBlank(message = "아이디를 입력해 주세요.")
    private String username;

    @NotBlank(message = "비밀번호를 입력해 주세요.")
    private String password;

    @NotBlank(message = "이름을 입력해 주세요.")
    private String name;

    @Pattern(regexp = "\\d+", message = "전화번호는 숫자만 입력 가능합니다.")
    private String phoneNumber;

    // 주소는 필수가 아니므로 유효성 검사를 추가하지 않습니다.
    private String address;
}