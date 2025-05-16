package com.example.backend.secu;

import com.example.backend.dao.sangin.SanginAuthDao;
import com.example.backend.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final SanginAuthDao userDao;

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto user = userDao.findByUsername(username); // 여기서 username = 아이디
        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }

        return new CustomUserDetails(user.getUserId() + "", user.getUsername(), user.getPassword(), user.getRole(), user.getStoreId());
    }
}
