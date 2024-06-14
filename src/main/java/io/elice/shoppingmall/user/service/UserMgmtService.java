package io.elice.shoppingmall.user.service;

import io.elice.shoppingmall.user.exception.DuplicateUsernameException;
import io.elice.shoppingmall.user.model.dto.UserMgmtDto;
import io.elice.shoppingmall.user.model.dto.UserDeleteDto;
import io.elice.shoppingmall.user.model.User;
import io.elice.shoppingmall.user.repository.UserMgmtRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserMgmtService {
    private final UserMgmtRepository userMgmtRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User getUser(Long id) {
        return userMgmtRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("유저를 찾을 수 없습니다."));
    }

    public User updateUser(Long id, UserMgmtDto userMgmtDto) {
        User user = userMgmtRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("유저를 찾을 수 없습니다."));

        user.setUsername(userMgmtDto.getUsername());
        user.setName(userMgmtDto.getName());
        user.setPhoneNumber(userMgmtDto.getPhoneNumber());
        user.setAddress(userMgmtDto.getAddress());
        if (userMgmtDto.getPassword() != null && !userMgmtDto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userMgmtDto.getPassword()));
        }

        return userMgmtRepository.save(user);
    }

    public void deleteUser(Long id, UserDeleteDto userDeleteDto) {
        User user = userMgmtRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("유저를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(userDeleteDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        user.setDeleted(true);
        userMgmtRepository.save(user);
    }

}