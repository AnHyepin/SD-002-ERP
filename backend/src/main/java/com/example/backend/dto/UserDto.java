package com.example.backend.dto;

import lombok.Data;

@Data
public class UserDto {
    private Integer userId;
    private String username;
    private String password;
    private String email;
    private String department;
    private String role;
    private Integer storeId;
    private String createdAt;
    private String name;
    private String gender;
    private String birthYear;
    private String birthMonth;
    private String birthDay;
    private String phoneNumber;
    private String agreeTerms;
    private boolean isActive;

    // getters & setters 생략
}
