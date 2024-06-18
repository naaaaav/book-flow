package io.elice.shoppingmall.user.service;

import io.elice.shoppingmall.user.exception.RoleNotExistException;
import io.elice.shoppingmall.user.exception.UserNotExistException;
import io.elice.shoppingmall.user.model.User;
import io.elice.shoppingmall.user.model.UserMapper;
import io.elice.shoppingmall.user.model.dto.AdminGetDto;
import io.elice.shoppingmall.user.model.dto.AdminGetPagingDto;
import io.elice.shoppingmall.user.model.dto.AdminRolePutDto;
import io.elice.shoppingmall.user.model.dto.TotalCountDto;
import io.elice.shoppingmall.user.repository.AdminRepository;
import io.elice.shoppingmall.user.util.UserMasking;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final UserMapper userMapper;

    public TotalCountDto totalCount() {
        Long userTotal = adminRepository.countByIsDeletedFalseAndRole(User.Role.USER.getKey());
        Long adminTotal = adminRepository.countByIsDeletedFalseAndRole(User.Role.ADMIN.getKey());
        return new TotalCountDto(userTotal, adminTotal);
    }

    public AdminGetPagingDto adminUserFindAll(Pageable pageable) {
        AdminGetPagingDto pagingDto = new AdminGetPagingDto();
        Page<User> page = adminRepository.findAllByIsDeletedFalse(pageable);
        page.getContent().stream().map(user -> {
            String name = UserMasking.name(user.getName());
            String phoneNumber = UserMasking.phoneNumber(user.getPhoneNumber());
            user.setName(name);
            user.setPhoneNumber(phoneNumber);
            return user;
        }).forEach(user -> pagingDto.getUserList().add(userMapper.userToAdminGetDto(user)));

        pagingDto.setFirst(page.isFirst());
        pagingDto.setLast(page.isLast());
        pagingDto.setCurrentPage(page.getNumber());
        pagingDto.setTotalPages(page.getTotalPages());
        return pagingDto;
    }

    public List<AdminGetDto> adminUserFindAll() {
        List<User> userList = adminRepository.findAllByIsDeletedFalse();
        userList = userList.stream().map(user -> {
            String name = UserMasking.name(user.getName());
            String phoneNumber = UserMasking.phoneNumber(user.getPhoneNumber());
            user.setName(name);
            user.setPhoneNumber(phoneNumber);
            return user;
        }).toList();

        return userMapper.userListToAdminGetDtoList(userList);
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
