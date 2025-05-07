package com.example.backend.controller.sangin;

import com.example.backend.secu.JwtTokenProvider;
import com.example.backend.secu.CustomUserDetails;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.Data;
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
                    loginRequest.getUserId(),
                    loginRequest.getPassword()
                )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            
            String token = jwtTokenProvider.createToken(userDetails.getUserId(), userDetails.getRole());
            jwtTokenProvider.addTokenToCookie(response, token);

            return ResponseEntity.ok(new LoginResponse(
                userDetails.getUserId(),
                userDetails.getRole(),
                token
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        jwtTokenProvider.deleteTokenCookie(response);
        return ResponseEntity.ok().build();
    }

    @Data
    static class LoginRequest {
        private String userId;
        private String password;
    }

    @Data
    static class LoginResponse {
        private final String userId;
        private final String role;
        private final String token;
    }
} 