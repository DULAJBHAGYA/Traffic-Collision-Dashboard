package com.server.server.service;

import org.springframework.stereotype.Service;
import com.server.server.repository.UsersRepository;
import com.server.server.entity.Users;
import java.util.Optional;

@Service
public class UsersService {

    private final UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public boolean validateLogin(String username, String password) {
        Optional<Users> user = usersRepository.findByUsernameAndPassword(username, password);
        return user.isPresent();
    }

    public Optional<Users> getUserByUsername(String username) {
        return usersRepository.findByUsername(username);
    }

    public boolean userExists(String username) {
        return usersRepository.existsByUsername(username);
    }
}