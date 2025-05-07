package com.example.backend.dao.sangin;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface SanginAuthDao {
    Object login(LoginRequest loginRequest);
    Object register(RegisterRequest registerRequest);
    boolean checkDuplicateId(String userId);
    boolean checkDuplicateEmail(String email);
    boolean checkDuplicatePhone(String phoneNumber);
} 