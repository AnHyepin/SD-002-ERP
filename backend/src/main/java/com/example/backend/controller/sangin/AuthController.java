package com.example.backend.controller.sangin;

import com.example.backend.secu.JwtTokenProvider;
import com.example.backend.secu.CustomUserDetails;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            String token = jwtTokenProvider.createToken(
                    userDetails.getUserId(), // userId
                    userDetails.getUsername(), // ✅ username
                    userDetails.getRole(), // role
                    userDetails.getStoreId() // storeId
            );
            System.out.println("로그인 api 실행");
            System.out.println(" userdetails.getUserId(): " + userDetails.getUserId());
            System.out.println(" userdetails.getUsername(): " + userDetails.getUsername());
            System.out.println(" userdetails.getRole(): " + userDetails.getRole());
            System.out.println(" userdetails.getStoreId(): " + userDetails.getStoreId());

            jwtTokenProvider.addTokenToCookie(response, token);

            return ResponseEntity.ok(new LoginResponse(
                userDetails.getUserId(), // userId
                userDetails.getUsername(),
                userDetails.getRole(),
                token
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
    }
    @GetMapping("/check-login")
    public ResponseEntity<?> checkLogin(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok().build(); // 로그인 상태면 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 아니면 401
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        jwtTokenProvider.deleteTokenCookie(response);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUserInfo(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(new UserInfoResponse(
                userDetails.getUserId(),
                userDetails.getUsername(),
                userDetails.getRole(),
                userDetails.getStoreId()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        }
    }

    @Data
    static class LoginRequest {
        private String username;
        private String password;
    }

    @Data
    static class LoginResponse {
        private final String userId;
        private final String username;
        private final String role;
        private final String token;
    }

    @Data
    static class UserInfoResponse {
        private final String userId;
        private final String username;
        private final String role;
        private final Integer storeId;
    }
} 