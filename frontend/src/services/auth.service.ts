import {
    createUser,
    getByEmail
} from "./user.service";

import type {
    LoginRequest,
    AuthResponse,
    ServiceResult,
    RegisterRequest
} from "../mock/types";

/**
 * Chave utilizada para armazenar o token.
 */
const TOKEN_KEY = "token";

/* ========================================================================== */
/*                                   LOGIN                                    */
/* ========================================================================== */

/**
 * Realiza o login de um usuário.
 */
export function login(
    request: LoginRequest
): ServiceResult<AuthResponse> {

    const user = getByEmail(request.email);

    if (!user || user.password !== request.password) {

        return {
            success: false,
            message: "Email ou senha inválidos."
        };

    }

    const response: AuthResponse = {

        token: `mock-token-${user.id}`,

        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }

    };

    localStorage.setItem(
        TOKEN_KEY,
        response.token
    );

    return {
        success: true,
        data: response
    };

}

/* ========================================================================== */
/*                                 REGISTER                                   */
/* ========================================================================== */

/**
 * Realiza o cadastro de um novo usuário.
 */
export function register(
    request: RegisterRequest
): ServiceResult<AuthResponse> {

    const result = createUser({

        name: request.name,
        email: request.email,
        password: request.password

    });

    if (!result.success) {
        return result;
    }

    const response: AuthResponse = {

        token: `mock-token-${result.data.id}`,

        user: {
            id: result.data.id,
            name: result.data.name,
            email: result.data.email
        }

    };

    localStorage.setItem(
        TOKEN_KEY,
        response.token
    );

    return {
        success: true,
        data: response
    };

}

/* ========================================================================== */
/*                                  LOGOUT                                    */
/* ========================================================================== */

/**
 * Encerra a sessão atual.
 */
export function logout(): void {

    localStorage.removeItem(TOKEN_KEY);

}

/* ========================================================================== */
/*                                  TOKEN                                     */
/* ========================================================================== */

/**
 * Retorna o token armazenado.
 */
export function getToken(): string | null {

    return localStorage.getItem(TOKEN_KEY);

}

/**
 * Verifica se existe um usuário autenticado.
 */
export function isAuthenticated(): boolean {

    return getToken() !== null;

}