package io.elice.shoppingmall.user.service;


import io.elice.shoppingmall.user.exception.PasswordNotMatchException;
import io.elice.shoppingmall.user.exception.UserNotExistException;
import io.elice.shoppingmall.user.model.User;
import io.elice.shoppingmall.user.model.dto.UserDeleteDto;
import io.elice.shoppingmall.user.model.dto.UserGetDto;
import io.elice.shoppingmall.user.model.dto.UserPostDto;
import io.elice.shoppingmall.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
        userGetDto.setAddress(user.getAddress());

        return userGetDto;
    }

    public boolean updateUser(UserPostDto userPostDto) {
        String username = authService.getCurrentUsername();
        if (username.equals("anonymousUser")) {
            throw new UserNotExistException("사용자가 존재하지 않습니다.");
        }
        User user = userRepository.findByUsername(username);

        if (userPostDto.getPassword() != null || !userPostDto.getPassword().equals("")) {
            user.setPassword(passwordEncoder.encode(userPostDto.getPassword()));
        }

        if (userPostDto.getName() != null || !userPostDto.getName().equals("")) {
            user.setName(userPostDto.getName());
        }

        if (userPostDto.getPhoneNumber() != null || !userPostDto.getPhoneNumber().equals("")) {
            user.setPhoneNumber(userPostDto.getPhoneNumber());
        }

        if (userPostDto.getAddress() != null || !userPostDto.getAddress().equals("")) {
            user.setAddress(userPostDto.getAddress());
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
