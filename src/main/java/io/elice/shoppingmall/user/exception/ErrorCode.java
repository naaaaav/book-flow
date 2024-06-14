package io.elice.shoppingmall.user.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

    USER_NOT_EXIST(400, "UserNotExistException", "사용자를 찾을 수 없습니다."),
    ROLE_NOT_EXIST(400, "RoleNotExistException", "사용자 권한이 존재하지 않습니다."),
    USERNAME_DUPLICATE(400, "DuplicateUsernameException", "아이디가 중복되었습니다."),
    EMPTY_USERNAME_PASSWORD(400, "DuplicateUsernameException", "아이디 또는 비밀번호를 입력해주세요"),
    LOGIN_FAILED(401, "LoginFailedException", "아이디, 비밀번호가 일치하지 않습니다.");

    private final int status;
    private final String message;
    private final String detailMessage;

    ErrorCode(int status, String message, String detailMessage) {
        this.status = status;
        this.message = message;
        this.detailMessage = detailMessage;
    }
}
