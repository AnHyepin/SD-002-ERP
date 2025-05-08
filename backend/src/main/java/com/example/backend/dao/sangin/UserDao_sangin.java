package com.example.backend.dao.sangin;

import com.example.backend.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserDao_sangin {
    List<UserDto> getAllUsers();
    void insertUser(UserDto user);
    void updateUser(UserDto user);
    void deleteUser(int id);
    int countByUsername(String username);
    int countByEmail(String email);
    int countByPhoneNumber(String phoneNumber);

}
