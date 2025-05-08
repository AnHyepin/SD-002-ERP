package com.example.backend.service.sangin;

import com.example.backend.dao.sangin.UserDao_sangin;
import com.example.backend.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService_sangin {

    @Autowired
    private UserDao_sangin userDao;

    public List<UserDto> getAllUsers() {
        return userDao.getAllUsers();
    }

    public void insertUser(UserDto user) {
        userDao.insertUser(user);
    }

    public void updateUser(UserDto user) {
        userDao.updateUser(user);
    }

    public void deleteUser(int id) {
        userDao.deleteUser(id);
    }
}
