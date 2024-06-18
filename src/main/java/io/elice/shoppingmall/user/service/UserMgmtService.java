package io.elice.shoppingmall.user.service;

import io.elice.shoppingmall.user.model.dto.UserMgmtDto;
import io.elice.shoppingmall.user.model.dto.UserDeleteDto;
import io.elice.shoppingmall.user.model.User;
import io.elice.shoppingmall.user.repository.UserMgmtRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserMgmtService {
    private final UserMgmtRepository userMgmtRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User getCurrentUser(Long id) {
        return userMgmtRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
    }

    public User updateUser(Long id, UserMgmtDto userMgmtDto) {
        User user = getCurrentUser(id);

        user.setName(userMgmtDto.getName());
        user.setPhoneNumber(userMgmtDto.getPhoneNumber());
        user.setAddress(userMgmtDto.getAddress());

        // 비밀번호가 입력되었을 경우에만 변경
        if (userMgmtDto.getPassword() != null && !userMgmtDto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userMgmtDto.getPassword()));
        }
        throw new RuntimeException("User not found");
    } //gpt

    public void deleteUser(Long id) {
        userMgmtRepository.deleteById(id);
    }

    public void deleteUser(Long id, UserDeleteDto userDeleteDto) {
        User user = getCurrentUser(id);

        if (!passwordEncoder.matches(userDeleteDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        user.setDeleted(true);
        userMgmtRepository.save(user);
    }
}