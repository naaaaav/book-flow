package io.elice.shoppingmall.user.service;


import io.elice.shoppingmall.user.exception.PasswordNotMatchException;
import io.elice.shoppingmall.user.exception.UserNotExistException;
import io.elice.shoppingmall.user.model.User;
import io.elice.shoppingmall.user.model.dto.UserDeleteDto;
import io.elice.shoppingmall.user.model.dto.UserGetDto;
import io.elice.shoppingmall.user.model.dto.UserPostDto;
import io.elice.shoppingmall.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.print.DocFlavor;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final AuthService authService;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserGetDto getUser() {
        String username = authService.getCurrentUsername();
        if (username.equals("anonymousUser")) {
            throw new UserNotExistException("사용자가 존재하지 않습니다.");
        }
        User user = userRepository.findByUsername(username);
        UserGetDto userGetDto = new UserGetDto();

        userGetDto.setUsername(user.getUsername()); ;
        userGetDto.setName(user.getName()); ;
        userGetDto.setPhoneNumber(user.getPhoneNumber()); ;
        userGetDto.setOrderDeliveryPostalCode(user.getOrderDeliveryPostalCode());
        userGetDto.setOrderDeliveryAddress1(user.getOrderDeliveryAddress1());
        userGetDto.setOrderDeliveryAddress2(user.getOrderDeliveryAddress2());

        return userGetDto;
    }

    public boolean updateUser(UserPostDto userPostDto) {
        String username = authService.getCurrentUsername();
        if (username.equals("anonymousUser")) {
            throw new UserNotExistException("사용자가 존재하지 않습니다.");
        }
        User user = userRepository.findByUsername(username);

        log.info("우편번호 : " + userPostDto.getOrderDeliveryPostalCode());
        log.info("주소 : " + userPostDto.getOrderDeliveryPostalCode());
        log.info("상세주소 : " + userPostDto.getOrderDeliveryPostalCode());

        if (!StringUtils.isEmpty(userPostDto.getPassword())) {
            user.setPassword(passwordEncoder.encode(userPostDto.getPassword()));
        }

        if (!StringUtils.isEmpty(userPostDto.getName())) {
            user.setName(userPostDto.getName());
        }

        if (!StringUtils.isEmpty(userPostDto.getPhoneNumber())) {
            user.setPhoneNumber(userPostDto.getPhoneNumber());
        }

        if (!StringUtils.isEmpty(userPostDto.getOrderDeliveryPostalCode())) {
            user.setOrderDeliveryPostalCode(userPostDto.getOrderDeliveryPostalCode());
        }

        if (!StringUtils.isEmpty(userPostDto.getOrderDeliveryAddress1())) {
            user.setOrderDeliveryAddress1(userPostDto.getOrderDeliveryAddress1());
        }

        if (!StringUtils.isEmpty(userPostDto.getOrderDeliveryAddress2())) {
            user.setOrderDeliveryAddress2(userPostDto.getOrderDeliveryAddress2());
        }

        return userRepository.save(user) != null ? true : false;
    }

    public boolean deleteUser(UserDeleteDto userDeleteDto) {
        String username = authService.getCurrentUsername();
        if (username.equals("anonymousUser")) {
            throw new UserNotExistException("사용자가 존재하지 않습니다.");
        }
        User user = userRepository.findByUsername(username);

        if (!passwordEncoder.matches(userDeleteDto.getPassword(), user.getPassword())) {
            throw new PasswordNotMatchException("비밀번호가 일치하지 않습니다");
        }
        user.setDeleted(true);
        return userRepository.save(user) != null ? true : false;
    }
}
