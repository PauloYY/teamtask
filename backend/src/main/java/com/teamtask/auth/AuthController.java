package com.teamtask.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController{
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequest request){
        authService.register(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request){
        String token = authService.login(request);

        return ResponseEntity.ok(new AuthResponse(token));
    }
}