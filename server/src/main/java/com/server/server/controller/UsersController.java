package com.server.server.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.server.server.service.UsersService;
import com.server.server.dto.LoginRequest;
import com.server.server.dto.LoginResponse;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UsersController {

    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            if (loginRequest.getUsername() == null || loginRequest.getPassword() == null ||
                loginRequest.getUsername().trim().isEmpty() || loginRequest.getPassword().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new LoginResponse(false, "Username and password are required"));
            }

            boolean isValidLogin = usersService.validateLogin(loginRequest.getUsername(), loginRequest.getPassword());
            
            if (isValidLogin) {
                return ResponseEntity.ok(new LoginResponse(true, "Login successful", loginRequest.getUsername()));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(false, "Invalid username or password"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new LoginResponse(false, "Internal server error"));
        }
    }

    @GetMapping("/check/{username}")
    public ResponseEntity<LoginResponse> checkUserExists(@PathVariable String username) {
        try {
            boolean exists = usersService.userExists(username);
            if (exists) {
                return ResponseEntity.ok(new LoginResponse(true, "User exists", username));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new LoginResponse(false, "User not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new LoginResponse(false, "Internal server error"));
        }
    }
}