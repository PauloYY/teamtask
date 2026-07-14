package com.teamtask.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.teamtask.user.User;
import com.teamtask.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  public void register(RegisterRequest request) {
    User user = new User();
    user.setUsername(request.username());
    user.setEmail(request.email());
    user.setPassword(passwordEncoder.encode(request.password()));
    userRepository.save(user);
  }

  public String login(AuthRequest request){
    User user = userRepository
      .findByEmail(request.email())
      .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

    if(!passwordEncoder.matches(request.password(), user.getPassword())){
      throw new RuntimeException("Senha inválida");
    }

    return jwtService.generateToken(user);
  }
}
