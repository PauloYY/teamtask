import databaseJson from "./database.json";

import type {
    Database,
    User,
    Group,
    GroupMember,
    Task,
    TaskAssignment
} from "./types";

/**
 * Banco de dados em memória.
 *
 * O objeto abaixo é carregado uma única vez quando a aplicação inicia.
 * Todas as operações CRUD modificam esse objeto em memória.
 *
 * Nenhuma alteração é persistida em disco.
 */
const database: Database = structuredClone(databaseJson) as Database;

/* ========================================================================== */
/*                                   DATABASE                                 */
/* ========================================================================== */

export function getDatabase(): Database {
    return database;
}

/* ========================================================================== */
/*                                   USERS                                    */
/* ========================================================================== */

export function getUsers(): User[] {
    return database.users;
}

/* ========================================================================== */
/*                                   GROUPS                                   */
/* ========================================================================== */

export function getGroups(): Group[] {
    return database.groups;
}

/* ========================================================================== */
/*                              GROUP MEMBERS                                 */
/* ========================================================================== */

export function getGroupMembers(): GroupMember[] {
    return database.groupMembers;
}

/* ========================================================================== */
/*                                    TASKS                                   */
/* ========================================================================== */

export function getTasks(): Task[] {
    return database.tasks;
}

/* ========================================================================== */
/*                             TASK ASSIGNMENTS                               */
/* ========================================================================== */

export function getTaskAssignments(): TaskAssignment[] {
    return database.taskAssignments;
}