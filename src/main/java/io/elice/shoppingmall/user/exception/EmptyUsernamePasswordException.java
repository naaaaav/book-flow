package io.elice.shoppingmall.user.exception;

public class EmptyUsernamePasswordException extends RootException{
    private String description;

    public EmptyUsernamePasswordException(String description) {
        super(ErrorCode.EMPTY_USERNAME_PASSWORD);
    }
}
