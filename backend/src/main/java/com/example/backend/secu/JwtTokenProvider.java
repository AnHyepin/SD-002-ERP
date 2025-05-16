package com.example.backend.secu;

import io.jsonwebtoken.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

// JWT 생성 및 검증 담당 클래스
@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}") // application.properties에서 jwt.secret 값을 가져옴
    private String secretKey;

    @Value("${jwt.expiration}") // application.properties에서 jwt.expiration 값을 가져옴
    private long expiration;

    private static final String TOKEN_COOKIE_NAME = "provider00";

    // JWT 생성
    public String createToken(String userId, String username, String role, Integer storeId) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .setSubject(userId) // user_id 저장
                .claim("username", username) //
                .claim("role", role) // 사용자 역할 저장
                .claim("storeId", storeId)
                .setIssuedAt(now)//발급기간
                .setExpiration(validity) // 유효기간
                .signWith(SignatureAlgorithm.HS256, secretKey) //비밀키서명
                .compact();
    }


    // JWT 유효성 검사
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token); // 비밀 키로 검증
            return true; // 유효하면 true 반환
        } catch (JwtException | IllegalArgumentException e) {
            return false; // 유효하지 않으면 false 반환
        }
    }

    public String getUserIdFromToken(String token) {
        Claims claims = parseClaims(token);
        return claims.getSubject(); // ✅ "sub" 값을 반환하도록 수정
    }

    public String getUsernameFromToken(String token) {
        Claims claims = parseClaims(token);
        return claims.get("username", String.class);
    }


    // ✅ JWT에서 역할(Role) 추출
    public String getRoleFromToken(String token) {
        Claims claims = parseClaims(token);
        return claims.get("role", String.class); // JWT payload의 "role" 클레임
    }

    // ✅ JWT 파싱 메서드 (공통 로직)
    private Claims parseClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    public void addTokenToCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie(TOKEN_COOKIE_NAME, token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge((int) (expiration / 1000));
        response.addCookie(cookie);
    }

    public void deleteTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(TOKEN_COOKIE_NAME, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    public String getTokenFromRequest(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (TOKEN_COOKIE_NAME.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    public Integer getStoreIdFromToken(String token) {
        Claims claims = parseClaims(token);
        return claims.get("storeId", Integer.class);
    }

    private boolean isLocalEnvironment() {
        String host = System.getenv("HOSTNAME");
        return host == null || host.contains("localhost") || host.startsWith("192.168.") || host.startsWith("127.");
    }
}
