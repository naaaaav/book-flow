package io.elice.shoppingmall.user.exception;

public class PasswordNotMatchException extends RootException{
    private String description;

    public PasswordNotMatchException(String description) {
        super(ErrorCode.PASSWORD_NOT_MATCH);
    }
}
