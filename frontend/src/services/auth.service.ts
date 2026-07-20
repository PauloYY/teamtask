import {
    createUser,
    getByEmail
} from "./user.service";

import type {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    ServiceResult
} from "../mock/types";

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

    return {
        success: true,
        data: {
            token: `mock-token-${user.id}`,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
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

    return {
        success: true,
        data: {
            token: `mock-token-${result.data.id}`,
            user: { //Não usar esta propriedade, pois ela não existira neste caminho na API real
                id: result.data.id,
                name: result.data.name,
                email: result.data.email
            }
        }
    };

}