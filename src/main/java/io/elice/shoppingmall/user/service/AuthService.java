package io.elice.shoppingmall.user.service;

import io.elice.shoppingmall.user.exception.DuplicateUsernameException;
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

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthRepository authRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    @PostConstruct
    public void adminInit() {
        User user = new User();
        user.setUsername("admin");
        user.setPassword(passwordEncoder.encode("1234"));
        user.setRole(User.Role.ADMIN.getKey());
        user.setName("관리자용 계정");
        authRepository.save(user);
        dummyUser();
    }

    public void dummyUser() {
        User user = new User();
        user.setUsername("user01");
        user.setPassword(passwordEncoder.encode("1234"));
        user.setRole(User.Role.USER.getKey());
        user.setName("홍길동");
        authRepository.save(user);

        user = new User();
        user.setUsername("user02");
        user.setPassword(passwordEncoder.encode("1234"));
        user.setRole(User.Role.USER.getKey());
        user.setName("고미숙");
        authRepository.save(user);

        user = new User();
        user.setUsername("user03");
        user.setPassword(passwordEncoder.encode("1234"));
        user.setRole(User.Role.USER.getKey());
        user.setName("바루스");
        authRepository.save(user);
    }

    public String getCurrentUsername() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    public User getCurrentUser() {

        User currentUser = authRepository.findByUsername(getCurrentUsername());
        return currentUser;
    }

    public boolean join(JoinDto joinDto) {
        User user = userMapper.joinDtoToUser(joinDto);
        user.setPassword(passwordEncoder.encode(joinDto.getPassword()));
        user.setRole(User.Role.USER.getKey());

        if (authRepository.existsByUsername(user.getUsername())) {
            throw new DuplicateUsernameException("아이디가 중복 되었습니다");
        }

        return authRepository.save(user) != null ? true : false;
    }
}
