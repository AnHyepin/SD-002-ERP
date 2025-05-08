package com.example.backend.controller.sangin;
import com.example.backend.dao.sangin.UserDao_sangin;
import com.example.backend.dto.UserDto;
import com.example.backend.service.sangin.UserService_sangin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController_sangin {

    @Autowired
    private UserService_sangin userService;

    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public void insertUser(@RequestBody UserDto user) {
        userService.insertUser(user);
    }

    @PutMapping("/{id}")
    public void updateUser(@PathVariable int id, @RequestBody UserDto user) {
        user.setId(id);
        userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
    }
}