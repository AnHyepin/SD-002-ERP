package com.example.backend.secu;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// JWT 인증 필터: 모든 요청에서 JWT를 검증하고 인증 정보를 SecurityContext에 설정
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final String jwtCookieName; // 쿠키 이름을 외부 설정에서 가져오도록 수정

    // JwtTokenProvider와 쿠키 이름을 주입받아 초기화
    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider, String jwtCookieName) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.jwtCookieName = jwtCookieName;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String token = resolveToken(request);

            if (token != null && jwtTokenProvider.validateToken(token)) {
                String userId = jwtTokenProvider.getUserIdFromToken(token);
                String role = jwtTokenProvider.getRoleFromToken(token);
                String username = jwtTokenProvider.getUsernameFromToken(token);

                // ✅ CustomUserDetails 생성 (role 포함)
                CustomUserDetails userDetails = new CustomUserDetails(userId,  username,null, role);

                // ✅ Spring Security에 Authentication 객체 생성
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                // ✅ SecurityContextHolder에 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("JWT 인증 중 오류 발생: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }


    // 요청에서 쿠키를 통해 JWT 토큰을 추출하는 메서드
    private String resolveToken(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                // 설정된 쿠키 이름과 일치하는 JWT 반환
                if (jwtCookieName.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null; // 쿠키에 JWT가 없으면 null 반환
    }



}
