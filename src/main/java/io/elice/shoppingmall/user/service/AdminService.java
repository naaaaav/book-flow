package io.elice.shoppingmall.user.service;

import io.elice.shoppingmall.user.exception.RoleNotExistException;
import io.elice.shoppingmall.user.exception.UserNotExistException;
import io.elice.shoppingmall.user.model.User;
import io.elice.shoppingmall.user.model.UserMapper;
import io.elice.shoppingmall.user.model.dto.AdminPostDto;
import io.elice.shoppingmall.user.model.dto.AdminRolePutDto;
import io.elice.shoppingmall.user.model.dto.TotalCountDto;
import io.elice.shoppingmall.user.repository.AdminRepository;
import io.elice.shoppingmall.user.util.UserMasking;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final UserMapper userMapper;

    public TotalCountDto totalCount() {
        Long userTotal = adminRepository.totalCount(User.Role.USER.getKey());
        Long adminTotal = adminRepository.totalCount(User.Role.ADMIN.getKey());
        return new TotalCountDto(userTotal, adminTotal);
    }

    public List<AdminPostDto> adminUserFindAll() {
        List<User> userList = adminRepository.findAllByIsDeleted(false);
        userList = userList.stream().map(user -> {
            String name = UserMasking.name(user.getName());
            String phoneNumber = UserMasking.phoneNumber(user.getPhoneNumber());
            user.setName(name);
            user.setPhoneNumber(phoneNumber);
            return user;
        }).toList();
        return userMapper.UserListToAdminPostDtoList(userList);
    }

    public boolean adminUserRoleUpdate(Long userId, AdminRolePutDto adminRolePutDto) {
        User user = adminRepository.findById(userId)
                .orElseThrow(() ->new UserNotExistException("사용자를 찾을 수 없습니다."));

        if (User.Role.USER.getKey().equals(adminRolePutDto.getRole())) {
            user.setRole(User.Role.USER.getKey());
        } else if (User.Role.ADMIN.getKey().equals(adminRolePutDto.getRole())) {
            user.setRole(User.Role.ADMIN.getKey());
        } else {
            throw new RoleNotExistException("권한을 찾을 수 없습니다.");
        }

        return adminRepository.save(user) != null ? true : false;
    }

    public boolean adminUserDelete(Long userId) {
        User user = adminRepository.findById(userId)
                .orElseThrow(() -> new UserNotExistException("사용자를 찾을 수 없습니다."));
        user.setDeleted(true);
        return adminRepository.save(user) != null ? true : false;
    }
}
