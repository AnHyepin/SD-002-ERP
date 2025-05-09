package com.example.backend.secu;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    public CustomAuthenticationSuccessHandler(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        try {
            // 인증된 사용자 정보 가져오기
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            // JWT 생성
            String token = jwtTokenProvider.createToken(
                    userDetails.getUserId(), // userId
                    userDetails.getUsername(), // ✅ username
                    userDetails.getRole() // role
            );


            // JWT를 쿠키에 추가
            jwtTokenProvider.addTokenToCookie(response, token);

            // 로그인 성공 후 "특정 페이지"로 리다이렉트
            response.sendRedirect("/"); // 원하는 URL로 리다이렉트 //나중에 수정예정
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
