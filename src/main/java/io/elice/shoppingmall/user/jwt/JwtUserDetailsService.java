package io.elice.shoppingmall.user.jwt;

import io.elice.shoppingmall.user.model.User;
import io.elice.shoppingmall.user.repository.AuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {

    private final AuthRepository authRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (authRepository.existsByUsernameAndIsDeletedFalse(username)) {
            User user = authRepository.findByUsernameAndIsDeletedFalse(username);
            return new JwtUserDetails(user);
        }

        throw new UsernameNotFoundException("아이디를 찾을 수 없습니다.");
    }
}
