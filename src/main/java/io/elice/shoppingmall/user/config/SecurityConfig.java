package io.elice.shoppingmall.user.config;

import io.elice.shoppingmall.user.jwt.JwtAuthenticationFilter;
import io.elice.shoppingmall.user.jwt.JwtGenericFilterBean;
import io.elice.shoppingmall.user.jwt.JwtOncePerRequestFilter;
import io.elice.shoppingmall.user.jwt.JwtService;
import io.elice.shoppingmall.user.repository.RefreshRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsConfig corsConfig;
    private final JwtService jwtService;
    private final RefreshRepository refreshRepository;
    private final AuthenticationConfiguration authenticationConfiguration;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(auth -> auth.disable())
                .formLogin(auth -> auth.disable())
                .httpBasic(auth -> auth.disable())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );

        http
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/", "/join", "/login", "/reissue").permitAll()
                        .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/user/**").hasAnyRole("USER")
                        .anyRequest().permitAll()
                );
        http
                .addFilter(corsConfig.corsFilter())
                .addFilterBefore(new JwtOncePerRequestFilter(jwtService), JwtAuthenticationFilter.class)
                .addFilterAt(new JwtAuthenticationFilter(authenticationManager(authenticationConfiguration), jwtService), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JwtGenericFilterBean(jwtService, refreshRepository), LogoutFilter.class);



        return http.build();
    }

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //AuthenticationManager Bean 등록
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}