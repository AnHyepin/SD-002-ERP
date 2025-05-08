package com.example.backend.controller.sangin;
import com.example.backend.dao.sangin.UserDao_sangin;
import com.example.backend.dto.UserDto;
import com.example.backend.service.sangin.UserService_sangin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController_sangin {

    @Autowired
    private UserService_sangin userService;

//  사용자 관리
    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/{id}")
    public void updateUser(@PathVariable int id, @RequestBody UserDto user) {
        user.setUserId(id);
        userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
    }
//  중복 체크 ( 회원가입용 )
    @GetMapping("/check-duplicate-username")
    public ResponseEntity<?> checkDuplicateId(@RequestParam String username) {
        boolean isDuplicate = userService.checkDuplicateUsername(username);
        return ResponseEntity.ok().body(Map.of("duplicate", isDuplicate));
    }

    @GetMapping("/check-duplicate-email")
    public ResponseEntity<?> checkDuplicateEmail(@RequestParam String email) {
        boolean isDuplicate = userService.checkDuplicateEmail(email);
        return ResponseEntity.ok().body(Map.of("duplicate", isDuplicate));
    }

    @GetMapping("/check-duplicate-phoneNumber")
    public ResponseEntity<?> checkDuplicatePhone(@RequestParam String phoneNumber) {
        boolean isDuplicate = userService.checkDuplicatePhone(phoneNumber);
        return ResponseEntity.ok().body(Map.of("duplicate", isDuplicate));
    }
//    회원가입
    @PostMapping("/regist-user")
    public ResponseEntity<?> registerUser(@RequestBody UserDto user) {
        userService.insertUser(user);
        return ResponseEntity.ok().build();
    }


}