package com.example.backend.secu;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    public CustomLogoutSuccessHandler(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        jwtTokenProvider.deleteTokenCookie(response);

        // ✅ 로그아웃 성공 메시지 쿠키 추가
        Cookie logoutCookie = new Cookie("logoutMessage", "로그아웃했습니다!");
        logoutCookie.setPath("/");
        logoutCookie.setMaxAge(5); // 5초 후 자동 삭제
        response.addCookie(logoutCookie);

        response.setStatus(HttpServletResponse.SC_OK);

        try {
            response.sendRedirect("/"); // 리다이렉트 경로 // 나중에 수정 예정
        } catch (IOException e) {
            e.printStackTrace(); // 예외 처리
        }
    }
}
