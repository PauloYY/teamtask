import {
    create,
    findAll,
    findById,
    remove,
    update
} from "../mock/crud";

import {
    getTasks,
    getTaskAssignments
} from "../mock/database";

import type {
    AssignmentStatus,
    ServiceResult,
    Task,
    TaskAssignment,
    NotificationMode
} from "../mock/types";

import {
    getRelated
} from "../utils/relations";

/* ========================================================================== */
/*                                   READ                                     */
/* ========================================================================== */

/**
 * Retorna todas as tarefas.
 */
export function getAll(): Task[] {

    return findAll(getTasks());

}

/**
 * Procura uma tarefa pelo ID.
 */
export function getById(
    id: number
): Task | undefined {

    return findById(
        getTasks(),
        id
    );

}

/**
 * Retorna todas as tarefas de um grupo.
 */
export function getByGroup(
    groupId: number
): Task[] {

    return getRelated(
        getTasks(),
        "groupId",
        groupId
    );

}

/**
 * Retorna todos os responsáveis de uma tarefa.
 */
export function getAssignments(
    taskId: number
): TaskAssignment[] {

    return getRelated(
        getTaskAssignments(),
        "taskId",
        taskId
    );

}

/**
 * Retorna todas as tarefas atribuídas a um usuário.
 */
export function getByUser(
    userId: number
): Task[] {

    const assignments = getRelated(
        getTaskAssignments(),
        "userId",
        userId
    );

    return assignments
        .map(assignment => getById(assignment.taskId))
        .filter((task): task is Task => task !== undefined);

}

/**
 * Retorna todas as tarefas pendentes.
 */
export function getPending(): TaskAssignment[] {

    return getTaskAssignments().filter(
        assignment => assignment.status === "PENDING"
    );

}

/**
 * Retorna todas as tarefas concluídas.
 */
export function getCompleted(): TaskAssignment[] {

    return getTaskAssignments().filter(
        assignment => assignment.status === "COMPLETED"
    );

}

/**
 * Retorna todas as tarefas atrasadas.
 */
export function getOverdue(): TaskAssignment[] {

    return getTaskAssignments().filter(
        assignment => assignment.status === "OVERDUE"
    );

}

/* ========================================================================== */
/*                                  CREATE                                    */
/* ========================================================================== */

/**
 * Cria uma nova tarefa.
 */
export function createTask(
    task: Omit<Task, "id">
): ServiceResult<Task> {

    return {
        success: true,
        data: create(
            getTasks(),
            task
        )
    };

}

/* ========================================================================== */
/*                                  UPDATE                                    */
/* ========================================================================== */

/**
 * Atualiza uma tarefa.
 */
export function updateTask(
    id: number,
    task: Partial<Omit<Task, "id">>
): ServiceResult<Task> {

    const updated = update(
        getTasks(),
        id,
        task
    );

    if (!updated) {

        return {
            success: false,
            message: "Tarefa não encontrada."
        };

    }

    return {
        success: true,
        data: updated
    };

}

/**
 * Remove uma tarefa.
 */
export function deleteTask(
    id: number
): ServiceResult<void> {

    if (!remove(getTasks(), id)) {

        return {
            success: false,
            message: "Tarefa não encontrada."
        };

    }

    return {
        success: true,
        data: undefined
    };

}

/* ========================================================================== */
/*                              ASSIGNMENTS                                   */
/* ========================================================================== */

/**
 * Atribui uma tarefa a um usuário.
 */
export function assignUser(
    taskId: number,
    userId: number,
    description: string = ""
): ServiceResult<TaskAssignment> {

    const assignments = getAssignments(taskId);

    if (assignments.some(a => a.userId === userId)) {

        return {
            success: false,
            message: "Usuário já é responsável por esta tarefa."
        };

    }

    const assignment = create(
        getTaskAssignments(),
        {
            taskId,
            userId,
            description,
            status: "PENDING",
            completedAt: null
        }
    );

    return {
        success: true,
        data: assignment
    };

}

/**
 * Remove um responsável da tarefa.
 */
export function unassignUser(
    taskId: number,
    userId: number
): ServiceResult<void> {

    const assignments = getTaskAssignments();

    const index = assignments.findIndex(a =>
        a.taskId === taskId &&
        a.userId === userId
    );

    if (index === -1) {

        return {
            success: false,
            message: "Responsável não encontrado."
        };

    }

    assignments.splice(index, 1);

    return {
        success: true,
        data: undefined
    };

}

/**
 * Marca uma atribuição como concluída.
 */
export function completeAssignment(
    taskId: number,
    userId: number
): ServiceResult<TaskAssignment> {

    const assignment = getTaskAssignments().find(a =>
        a.taskId === taskId &&
        a.userId === userId
    );

    if (!assignment) {

        return {
            success: false,
            message: "Responsável não encontrado."
        };

    }

    assignment.status = "COMPLETED";
    assignment.completedAt = new Date().toISOString();

    return {
        success: true,
        data: assignment
    };

}

/**
 * Reabre uma atribuição concluída.
 */
export function reopenAssignment(
    taskId: number,
    userId: number
): ServiceResult<TaskAssignment> {

    const assignment = getTaskAssignments().find(a =>
        a.taskId === taskId &&
        a.userId === userId
    );

    if (!assignment) {

        return {
            success: false,
            message: "Responsável não encontrado."
        };

    }

    assignment.status = "PENDING";
    assignment.completedAt = null;

    return {
        success: true,
        data: assignment
    };

}

/**
 * Altera o modo de notificação de uma tarefa.
 */
export function updateNotificationMode(
    taskId: number,
    mode: NotificationMode
): ServiceResult<Task> {

    return updateTask(taskId, {
        notificationMode: mode
    });

}

/**
 * Atualiza o status de uma atribuição.
 */
export function updateAssignmentStatus(
    taskId: number,
    userId: number,
    status: AssignmentStatus
): ServiceResult<TaskAssignment> {

    const assignment = getTaskAssignments().find(a =>
        a.taskId === taskId &&
        a.userId === userId
    );

    if (!assignment) {

        return {
            success: false,
            message: "Responsável não encontrado."
        };

    }

    assignment.status = status;

    if (status === "COMPLETED") {
        assignment.completedAt = new Date().toISOString();
    } else {
        assignment.completedAt = null;
    }

    return {
        success: true,
        data: assignment
    };

}