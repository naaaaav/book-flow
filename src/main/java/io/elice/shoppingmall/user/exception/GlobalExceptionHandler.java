package io.elice.shoppingmall.user.exception;


import io.elice.shoppingmall.user.model.dto.ErrorResponseDto;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotExistException.class)
    public ResponseEntity<ErrorResponseDto> userNotFoundException(HttpServletResponse response, UserNotExistException ex) {
        log.error("message: {}", ex.getErrorCode().getDetailMessage());
        return new ResponseEntity(new ErrorResponseDto(ex.getErrorCode().getStatus(), ex.getErrorCode().getDetailMessage()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RoleNotExistException.class)
    public ResponseEntity<ErrorResponseDto> roleNotExistException(HttpServletResponse response, RoleNotExistException ex) {
        log.error("message: {}", ex.getErrorCode().getDetailMessage());
        return new ResponseEntity(new ErrorResponseDto(ex.getErrorCode().getStatus(), ex.getErrorCode().getDetailMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DuplicateUsernameException.class)
    public ResponseEntity<ErrorResponseDto> duplicateUsernameException(HttpServletResponse response, DuplicateUsernameException ex) {
        log.error("message: {}", ex.getErrorCode().getDetailMessage());
        return new ResponseEntity(new ErrorResponseDto(ex.getErrorCode().getStatus(), ex.getErrorCode().getDetailMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PasswordNotMatchException.class)
    public ResponseEntity<ErrorResponseDto> passwordNotMatchException(HttpServletResponse response, PasswordNotMatchException ex) {
        log.error("message: {}", ex.getErrorCode().getDetailMessage());
        return new ResponseEntity(new ErrorResponseDto(ex.getErrorCode().getStatus(), ex.getErrorCode().getDetailMessage()),HttpStatus.BAD_REQUEST);
    }
}
