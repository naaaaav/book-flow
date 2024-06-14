package io.elice.shoppingmall.user.controller;

import io.elice.shoppingmall.user.model.dto.AdminGetDto;
import io.elice.shoppingmall.user.model.dto.AdminGetPagingDto;
import io.elice.shoppingmall.user.model.dto.AdminRolePutDto;
import io.elice.shoppingmall.user.model.dto.TotalCountDto;
import io.elice.shoppingmall.user.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/member")
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/total")
    public ResponseEntity<TotalCountDto> totalCount() {
        TotalCountDto totalCount = adminService.totalCount();
        return new ResponseEntity<>(totalCount, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<AdminGetPagingDto> adminUserFindAllPaging(@RequestParam(value = "page", defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return new ResponseEntity<>(adminService.adminUserFindAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/nopaging")
    public ResponseEntity<List<AdminGetDto>> adminUserFindAll() {
        return new ResponseEntity<>(adminService.adminUserFindAll(), HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> adminUserRoleUpdate(@PathVariable Long userId, @RequestBody AdminRolePutDto adminRolePutDto) {
        adminService.adminUserRoleUpdate(userId, adminRolePutDto);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> adminUserDelete(@PathVariable Long userId) {
        adminService.adminUserDelete(userId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
