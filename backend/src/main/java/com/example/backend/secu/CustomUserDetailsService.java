package com.example.backend.secu;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
//    나중에 AuthenticationManager가 customUserDetailsService 호출해서 CustomUserDetails 반환하면
//    DaoAuthenticationProvider에서 UsernamePasswordAuthenticationFilter(사용자 로그인 입력 정보 = 아이디 비번)이랑
//    matches 함수 써서 비밀번호 비교함. 아이디는 여기서 findByUserId사용해서 일단 db에서 갖고옴
//    그리고 스프링 di가 관리하는 영역에 들어간 BCryptEncoderPassword 가 서로 복호화하고 암호해제해서 비교함.
//    로그인 성공시 쿠키발급하고 jwt필터가 필터 검증 => 쿠키있으면 security config에 의해 역할에 따른 요청 가능해지고
//    로그인 실패시 로그인 폼으로 이동하게 만듬

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        // 임시로 하드코딩된 사용자 정보 반환
        // TODO: 실제 데이터베이스 연동 구현 필요
        if ("admin".equals(userId)) {
            return new CustomUserDetails("admin", null, "ROLE_ADMIN");
        } else if ("user".equals(userId)) {
            return new CustomUserDetails("user", null, "ROLE_USER");
        }
        
        throw new UsernameNotFoundException("User not found: " + userId);
    }
}
