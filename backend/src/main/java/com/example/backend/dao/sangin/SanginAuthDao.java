package com.example.backend.dao.sangin;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface SanginAuthDao {
    Object login(LoginRequest loginRequest);
    UserDto findByUsername(String username);

}