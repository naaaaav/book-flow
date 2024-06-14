package io.elice.shoppingmall.user.controller;

import io.elice.shoppingmall.user.model.dto.UserMgmtDto;
import io.elice.shoppingmall.user.model.dto.UserDeleteDto;
import io.elice.shoppingmall.user.model.User;
import io.elice.shoppingmall.user.service.UserMgmtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserMgmtController {
    private final UserMgmtService userMgmtService;

    @GetMapping("/{id}/update")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userMgmtService.getUser(id));
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody @Valid UserMgmtDto userMgmtDto) {
        return ResponseEntity.ok(userMgmtService.updateUser(id, userMgmtDto));
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id, @RequestBody @Valid UserDeleteDto userDeleteDto) {
        userMgmtService.deleteUser(id, userDeleteDto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}