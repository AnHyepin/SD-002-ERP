package com.example.backend.service.sangin;

import com.example.backend.dao.sangin.SanginAuthDao;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SanginAuthService {

    @Autowired
    private SanginAuthDao authDao;

    public ResponseEntity<?> login(LoginRequest loginRequest) {
        try {
            // 로그인 로직 구현
            return ResponseEntity.ok(authDao.login(loginRequest));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("로그인 실패: " + e.getMessage());
        }
    }

    public ResponseEntity<?> register(RegisterRequest registerRequest) {
        try {
            // 회원가입 로직 구현
            return ResponseEntity.ok(authDao.register(registerRequest));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("회원가입 실패: " + e.getMessage());
        }
    }

    public ResponseEntity<?> checkDuplicateId(String userId) {
        try {
            boolean isDuplicate = authDao.checkDuplicateId(userId);
            return ResponseEntity.ok(Map.of("duplicate", isDuplicate));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("중복 확인 실패: " + e.getMessage());
        }
    }

    public ResponseEntity<?> checkDuplicateEmail(String email) {
        try {
            boolean isDuplicate = authDao.checkDuplicateEmail(email);
            return ResponseEntity.ok(Map.of("duplicate", isDuplicate));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("중복 확인 실패: " + e.getMessage());
        }
    }

    public ResponseEntity<?> checkDuplicatePhone(String phoneNumber) {
        try {
            boolean isDuplicate = authDao.checkDuplicatePhone(phoneNumber);
            return ResponseEntity.ok(Map.of("duplicate", isDuplicate));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("중복 확인 실패: " + e.getMessage());
        }
    }
} 