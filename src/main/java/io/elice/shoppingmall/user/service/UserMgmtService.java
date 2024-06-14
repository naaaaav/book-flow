package io.elice.shoppingmall.user.service;

import io.elice.shoppingmall.user.model.UserMgmtDto;
import io.elice.shoppingmall.user.model.User;
import io.elice.shoppingmall.user.repository.UserMgmtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserMgmtService {

    @Autowired
    private UserMgmtRepository userMgmtRepository;

    public Optional<User> getUserById(Long id) {
        return userMgmtRepository.findById(id);
    }

    public User updateUser(UserMgmtDto userMgmtDto) {
        Optional<User> optionalUser = userMgmtRepository.findById(userMgmtDto.getId());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUsername(userMgmtDto.getUsername());
            user.setName(userMgmtDto.getName());
            user.setPassword(userMgmtDto.getPassword());
            user.setAddress(userMgmtDto.getAddress());
            user.setPhoneNumber(userMgmtDto.getPhoneNumber());
            return userMgmtRepository.save(user);
        }
        throw new RuntimeException("User not found");
    } //gpt

    public void deleteUser(Long id) {
        userMgmtRepository.deleteById(id);
    }
}