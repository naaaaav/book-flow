package io.elice.shoppingmall.user.controller;


import io.elice.shoppingmall.user.model.dto.ErrorResponseDto;
import io.elice.shoppingmall.user.model.dto.UserDeleteDto;
import io.elice.shoppingmall.user.model.dto.UserGetDto;
import io.elice.shoppingmall.user.model.dto.UserPostDto;
import io.elice.shoppingmall.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user/member")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserGetDto> getUser() {
        return new ResponseEntity<>(userService.getUser(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody UserPostDto userPostDto) {
        userService.updateUser(userPostDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser(@Valid @RequestBody UserDeleteDto userDeleteDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldError().getDefaultMessage();
            log.info(errorMessage);
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto(400, errorMessage),HttpStatus.BAD_REQUEST);
        }
        userService.deleteUser(userDeleteDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
