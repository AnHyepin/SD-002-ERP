package com.example.backend.secu;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {
    private final String userId;
    private final String username;
    private final String password;
    private final String role; // ✅ 역할 추가
    private final Integer storeId;

    public CustomUserDetails(String userId, String username, String password, String role, Integer storeId) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.role = role;
        this.storeId = storeId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role)); // ✅ GrantedAuthority 형태로 반환
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }
    public String getUserId() {
        return userId;
    }
    public String getRole() {
        return role;
    }
    public Integer getStoreId() {
        return storeId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
