package io.elice.shoppingmall.user.exception;

public class LoginFailedException extends RootException{
    private String description;

    public LoginFailedException(String description) {
        super(ErrorCode.LOGIN_FAILED);
    }
}
