import {
    create,
    findAll,
    findById,
    remove,
    update
} from "../mock/crud";

import {
    getGroups,
    getGroupMembers
} from "../mock/database";

import type {
    Group,
    GroupMember,
    ServiceResult
} from "../mock/types";

import {
    getRelated,
    getFirstRelated
} from "../utils/relations";

/* ========================================================================== */
/*                                   READ                                     */
/* ========================================================================== */

/**
 * Retorna todos os grupos.
 */
export function getAll(): Group[] {

    return findAll(getGroups());

}

/**
 * Procura um grupo pelo ID.
 */
export function getById(
    id: number
): Group | undefined {

    return findById(
        getGroups(),
        id
    );

}

/**
 * Retorna todos os membros de um grupo.
 */
export function getMembers(
    groupId: number
): GroupMember[] {

    return getRelated(
        getGroupMembers(),
        "groupId",
        groupId
    );

}

/**
 * Retorna o proprietário do grupo.
 */
export function getOwner(
    groupId: number
): GroupMember | undefined {

    return getFirstRelated(
        getMembers(groupId),
        "role",
        "OWNER"
    );

}

/**
 * Verifica se um usuário pertence ao grupo.
 */
export function isMember(
    groupId: number,
    userId: number
): boolean {

    return getMembers(groupId).some(
        member => member.userId === userId
    );

}

/* ========================================================================== */
/*                                  CREATE                                    */
/* ========================================================================== */

/**
 * Cria um grupo.
 */
export function createGroup(
    group: Omit<Group, "id">
): ServiceResult<Group> {

    return {
        success: true,
        data: create(
            getGroups(),
            group
        )
    };

}

/* ========================================================================== */
/*                                  UPDATE                                    */
/* ========================================================================== */

/**
 * Atualiza um grupo.
 */
export function updateGroup(
    id: number,
    group: Partial<Omit<Group, "id">>
): ServiceResult<Group> {

    const updated = update(
        getGroups(),
        id,
        group
    );

    if (!updated) {

        return {
            success: false,
            message: "Grupo não encontrado."
        };

    }

    return {
        success: true,
        data: updated
    };

}

/* ========================================================================== */
/*                                  DELETE                                    */
/* ========================================================================== */

/**
 * Remove um grupo.
 */
export function deleteGroup(
    id: number
): ServiceResult<void> {

    if (!remove(getGroups(), id)) {

        return {
            success: false,
            message: "Grupo não encontrado."
        };

    }

    return {
        success: true,
        data: undefined
    };

}

/* ========================================================================== */
/*                              GROUP MEMBERS                                 */
/* ========================================================================== */

/**
 * Adiciona um usuário ao grupo.
 */
export function addMember(
    groupId: number,
    userId: number,
    role: GroupMember["role"] = "MEMBER"
): ServiceResult<GroupMember> {

    if (isMember(groupId, userId)) {

        return {
            success: false,
            message: "O usuário já pertence ao grupo."
        };

    }

    const member = create(
        getGroupMembers(),
        {
            groupId,
            userId,
            role
        }
    );

    return {
        success: true,
        data: member
    };

}

/**
 * Remove um usuário do grupo.
 */
export function removeMember(
    groupId: number,
    userId: number
): ServiceResult<void> {

    const members = getGroupMembers();

    const index = members.findIndex(member =>
        member.groupId === groupId &&
        member.userId === userId
    );

    if (index === -1) {

        return {
            success: false,
            message: "Usuário não pertence ao grupo."
        };

    }

    members.splice(index, 1);

    return {
        success: true,
        data: undefined
    };

}