package io.elice.shoppingmall.user.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.elice.shoppingmall.user.exception.EmptyUsernamePasswordException;
import io.elice.shoppingmall.user.exception.ErrorCode;
import io.elice.shoppingmall.user.model.dto.ErrorResponseDto;
import io.elice.shoppingmall.user.model.dto.LoginDto;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter  {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    // 클라이언트에서 /login 요청시 security에서 클라이언트 요청을 가로챔
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        //String username = obtainUsername(request);
        //String password = obtainPassword(request);

        LoginDto loginDto = new LoginDto();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ServletInputStream inputStream = request.getInputStream();
            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            loginDto = objectMapper.readValue(messageBody, LoginDto.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String username = loginDto.getUsername();
        String password = loginDto.getPassword();

        //username와 password를 authenticationManager에게 전달할때 필요한 객체
        UsernamePasswordAuthenticationToken authToken
                = new UsernamePasswordAuthenticationToken(username, password);

        if (loginDto.getUsername().equals("") || loginDto.getUsername() == null || loginDto.getPassword().equals("") || loginDto.getPassword() == null) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                response.setContentType("application/json");
                response.setCharacterEncoding("utf-8");
                response.setStatus(400);

                ErrorResponseDto error = new ErrorResponseDto();
                error.setStatus(400);
                error.setMessage(ErrorCode.EMPTY_USERNAME_PASSWORD.getDetailMessage());
                String result = objectMapper.writeValueAsString(error);
                response.getWriter().write(result);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return null;
        }
        log.info("로그인 테스트 : " + username + " " + password);

        Authentication authenticate = authenticationManager.authenticate(authToken);

        JwtUserDetails jwtUserDetails = (JwtUserDetails) authenticate.getPrincipal();
        log.info("jwtUserDetails.getUsername() : " + jwtUserDetails.getUsername());
        log.info("jwtUserDetails.getPassword() : " + jwtUserDetails.getPassword());
        log.info("jwtUserDetails.Role() : " + jwtUserDetails.getRole());

        return authenticate;
    }


    //로그인 성공시 실행되는 메서드 (Jwt 토큰 발행)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        JwtUserDetails jwtUserDetails = (JwtUserDetails) authentication.getPrincipal();
        String username = jwtUserDetails.getUsername();
        String role = jwtUserDetails.getRole();
        log.info("토큰 생성 username : " + username);
        log.info("토큰 생성 role : " + role);

        //access 토큰 생성
        String access = jwtService.createToken("access", username, role, 86400000L); //1일

        //refresh 토큰 생성
        String refresh = jwtService.createToken("refresh", username, role, 86400000L * 7); //7일

        log.info("access 토큰 : " + access);
        log.info("refresh 토큰 : " + refresh);

        //refresh 토큰 서버에 저장
        jwtService.saveRefreshTokenDB(username, refresh, 86400000L);
        response.setHeader("access", access);
        response.addCookie(jwtService.createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
    }

    //로그인 실패시 실행되는 메서드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.setStatus(401);

        ErrorResponseDto error = new ErrorResponseDto();
        error.setStatus(401);
        error.setMessage(ErrorCode.LOGIN_FAILED.getDetailMessage());
        String result = objectMapper.writeValueAsString(error);
        response.getWriter().write(result);

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
