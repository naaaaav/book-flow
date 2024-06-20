package io.elice.shoppingmall.user.service;

import io.elice.shoppingmall.user.exception.DuplicateUsernameException;
import io.elice.shoppingmall.user.model.dto.AuthRoleGetDto;
import io.elice.shoppingmall.user.model.dto.JoinDto;
import io.elice.shoppingmall.user.model.User;
import io.elice.shoppingmall.user.model.UserMapper;
import io.elice.shoppingmall.user.repository.AuthRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthRepository authRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    @PostConstruct
    public void adminInit() {
        if (!authRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("1234"));
            admin.setRole(User.Role.ADMIN.getKey());
            admin.setName("관리자용 계정");
            authRepository.save(admin);
        }
        dummyUser();
    }

    public void dummyUser() {
        if (!authRepository.existsByUsername("user01")) {
            User user01 = new User();
            user01.setUsername("user01");
            user01.setPassword(passwordEncoder.encode("1234"));
            user01.setRole(User.Role.USER.getKey());
            user01.setName("홍길동");
            authRepository.save(user01);
        }

        if (!authRepository.existsByUsername("user02")) {
            User user02 = new User();
            user02.setUsername("user02");
            user02.setPassword(passwordEncoder.encode("1234"));
            user02.setRole(User.Role.USER.getKey());
            user02.setName("고미숙");
            authRepository.save(user02);
        }

        if (!authRepository.existsByUsername("user03")) {
            User user03 = new User();
            user03.setUsername("user03");
            user03.setPassword(passwordEncoder.encode("1234"));
            user03.setRole(User.Role.USER.getKey());
            user03.setName("바루스");
            authRepository.save(user03);
        }
    }


    public String getCurrentUsername() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    public User getCurrentUser() {

        User currentUser = authRepository.findByUsernameAndIsDeletedFalse(getCurrentUsername());
        return currentUser;
    }

    @Transactional
    public boolean join(JoinDto joinDto) {
        User user = userMapper.joinDtoToUser(joinDto);
        user.setPassword(passwordEncoder.encode(joinDto.getPassword()));
        user.setRole(User.Role.USER.getKey());

        if (authRepository.existsByUsernameAndIsDeletedFalse(user.getUsername())) {
            throw new DuplicateUsernameException("아이디가 중복 되었습니다");
        }

        return authRepository.save(user) != null ? true : false;
    }

    public AuthRoleGetDto roleCheck() {
        AuthRoleGetDto authRoleGetDto = new AuthRoleGetDto();
        String username = getCurrentUsername();
        if (username.equals("anonymousUser")) {
            authRoleGetDto.setRole("ROLE_ANONYMOUS");
            return authRoleGetDto;
        }
        User user = getCurrentUser();
        authRoleGetDto.setRole(user.getRole());
        return authRoleGetDto;
    }
}
