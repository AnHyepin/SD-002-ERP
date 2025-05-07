package com.example.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String userId;
    private String password;
    private String name;
    private String gender;
    private String birthYear;
    private String birthMonth;
    private String birthDay;
    private String email;
    private String phoneNumber;
    private boolean agreeTerms;
} 