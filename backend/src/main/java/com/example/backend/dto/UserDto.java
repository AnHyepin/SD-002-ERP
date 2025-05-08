package com.example.backend.dto;

import lombok.Data;

@Data
public class UserDto {
    private int id;
    private String username;
    private String email;
    private String department;
    private String role;
    private boolean isActive;

    // getters & setters 생략
}
