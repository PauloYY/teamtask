package com.teamtask.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank(message="Username obrigatório")
    String username,

    @NotBlank(message="Email obrigatório")
    @Email(message="Email inválido")
    String email, 

    @NotBlank(message="Senha obrigatória")
    @Size(min=6, message="Senha dave ter no mínimo 6 caracteres")
    String password
) {}
