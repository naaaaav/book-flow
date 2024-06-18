package io.elice.shoppingmall.user.controller;

import io.elice.shoppingmall.user.model.dto.UserMgmtDto;
import io.elice.shoppingmall.user.model.dto.UserDeleteDto;
import io.elice.shoppingmall.user.model.User;
import io.elice.shoppingmall.user.service.AuthService;
import io.elice.shoppingmall.user.service.UserMgmtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@PreAuthorize("isAuthenticated()")
public class UserMgmtController {

    private final UserMgmtService userMgmtService;

    @GetMapping("/{id}") // 마이페이지 조회
    public ResponseEntity<User> getCurrentUser(@PathVariable Long id) {
        User currentUser = userMgmtService.getCurrentUser(id);
        return ResponseEntity.ok(currentUser);
    }

    @PutMapping("/{id}/update") // 사용자 정보 수정
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody @Valid UserMgmtDto userMgmtDto) {
        User updatedUser = userMgmtService.updateUser(id, userMgmtDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}/delete") // 회원 탈퇴
    public ResponseEntity<Void> deleteUser(@PathVariable Long id, @RequestBody @Valid UserDeleteDto userDeleteDto) {
        userMgmtService.deleteUser(id, userDeleteDto);
        return ResponseEntity.noContent().build();
    }
}