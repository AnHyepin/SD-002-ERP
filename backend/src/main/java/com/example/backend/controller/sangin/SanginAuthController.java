package com.example.backend.controller.sangin;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.service.sangin.SanginAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class SanginAuthController {

    @Autowired
    private SanginAuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        return authService.register(registerRequest);
    }

    @GetMapping("/check-duplicate-id")
    public ResponseEntity<?> checkDuplicateId(@RequestParam String userId) {
        return authService.checkDuplicateId(userId);
    }

    @GetMapping("/check-duplicate-email")
    public ResponseEntity<?> checkDuplicateEmail(@RequestParam String email) {
        return authService.checkDuplicateEmail(email);
    }

    @GetMapping("/check-duplicate-phone")
    public ResponseEntity<?> checkDuplicatePhone(@RequestParam String phoneNumber) {
        return authService.checkDuplicatePhone(phoneNumber);
    }
} 