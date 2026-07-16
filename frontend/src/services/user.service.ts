import {
    create,
    exists,
    findAll,
    findById,
    findOne,
    remove,
    update
} from "../mock/crud";

import { getUsers } from "../mock/database";

import type {
    ServiceResult,
    User
} from "../mock/types";

/* ========================================================================== */
/*                                   READ                                     */
/* ========================================================================== */

/**
 * Retorna todos os usuários.
 */
export function getAll(): User[] {

    return findAll(getUsers());

}

/**
 * Procura um usuário pelo ID.
 */
export function getById(
    id: number
): User | undefined {

    return findById(
        getUsers(),
        id
    );

}

/**
 * Procura um usuário pelo email.
 */
export function getByEmail(
    email: string
): User | undefined {

    return findOne(
        getUsers(),
        user => user.email === email
    );

}

/**
 * Verifica se um usuário existe.
 */
export function userExists(
    id: number
): boolean {

    return exists(
        getUsers(),
        user => user.id === id
    );

}

/**
 * Verifica se um email já está cadastrado.
 */
export function emailExists(
    email: string
): boolean {

    return exists(
        getUsers(),
        user => user.email === email
    );

}

/* ========================================================================== */
/*                                  CREATE                                    */
/* ========================================================================== */

/**
 * Cria um novo usuário.
 */
export function createUser(
    user: Omit<User, "id">
): ServiceResult<User> {

    if (emailExists(user.email)) {

        return {
            success: false,
            message: "Já existe um usuário com este email."
        };

    }

    return {
        success: true,
        data: create(
            getUsers(),
            user
        )
    };

}

/* ========================================================================== */
/*                                  UPDATE                                    */
/* ========================================================================== */

/**
 * Atualiza um usuário.
 */
export function updateUser(
    id: number,
    user: Partial<Omit<User, "id">>
): ServiceResult<User> {

    const current = getById(id);

    if (!current) {

        return {
            success: false,
            message: "Usuário não encontrado."
        };

    }

    if (
        user.email &&
        user.email !== current.email &&
        emailExists(user.email)
    ) {

        return {
            success: false,
            message: "Já existe um usuário com este email."
        };

    }

    return {
        success: true,
        data: update(
            getUsers(),
            id,
            user
        )!
    };

}

/* ========================================================================== */
/*                                  DELETE                                    */
/* ========================================================================== */

/**
 * Remove um usuário.
 */
export function deleteUser(
    id: number
): ServiceResult<void> {

    const removed = remove(
        getUsers(),
        id
    );

    if (!removed) {

        return {
            success: false,
            message: "Usuário não encontrado."
        };

    }

    return {
        success: true,
        data: undefined
    };

}