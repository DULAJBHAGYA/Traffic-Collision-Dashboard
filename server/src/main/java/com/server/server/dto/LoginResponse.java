package com.server.server.dto;

public class LoginResponse {

    private boolean success;
    private String message;
    private String username;

    public LoginResponse() {}

    public LoginResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public LoginResponse(boolean success, String message, String username) {
        this.success = success;
        this.message = message;
        this.username = username;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "success=" + success +
                ", message='" + message + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}