package io.elice.shoppingmall.user.jwt;

import io.elice.shoppingmall.user.model.User;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

@Slf4j
@RequiredArgsConstructor
public class JwtOncePerRequestFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = request.getHeader("access");

        if (accessToken == null || accessToken.equals("null")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            jwtService.isTokenExpired(accessToken);
        } catch (ExpiredJwtException e) {
            PrintWriter writer = response.getWriter();
            writer.print("access token expired");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        } catch (MalformedJwtException e) {
            PrintWriter writer = response.getWriter();
            writer.print("access token unsupported types");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String subject = jwtService.getTokenSubject(accessToken);

        if (!subject.equals("access")) {
            PrintWriter writer = response.getWriter();
            writer.print("invalid access token");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String username = jwtService.getTokenUsername(accessToken);
        String role = jwtService.getTokenRole(accessToken);

        User user = new User();
        user.setUsername(username);
        user.setRole(role);
        JwtUserDetails jwtUserDetails = new JwtUserDetails(user);

        Authentication authToken = new UsernamePasswordAuthenticationToken(jwtUserDetails, null, jwtUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}