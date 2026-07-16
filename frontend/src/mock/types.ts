/**
 * Tipos utilizados pelo banco de dados mockado.
 *
 * Estes tipos seguem a documentação da API do TeamTask e devem ser
 * compartilhados por todos os serviços de mock.
 */

export type GroupRole =
    | "OWNER"
    | "MEMBER";

export type NotificationMode =
    | "SINGLE"
    | "DAILY";

export type AssignmentStatus =
    | "PENDING"
    | "COMPLETED"
    | "OVERDUE";

/* ========================================================================== */
/*                                   USERS                                    */
/* ========================================================================== */

export interface User {

    /** Identificador único */
    id: number;

    /** Nome completo */
    name: string;

    /** Email */
    email: string;

    /** Senha (hash futuramente) */
    password: string;
}

/* ========================================================================== */
/*                                   GROUPS                                   */
/* ========================================================================== */

export interface Group {

    /** Identificador único */
    id: number;

    /** Nome do grupo */
    name: string;

    /** Descrição */
    description: string;

    /** Código de convite */
    inviteCode: string;
}

/* ========================================================================== */
/*                              GROUP MEMBERS                                 */
/* ========================================================================== */

export interface GroupMember {

    id: number;

    userId: number;

    groupId: number;

    role: GroupRole;
}

/* ========================================================================== */
/*                                    TASKS                                   */
/* ========================================================================== */

export interface Task {

    id: number;

    title: string;

    description: string;

    dueDate: string;

    reminderDate: string;

    notificationMode: NotificationMode;

    groupId: number;

    createdBy: number;
}

/* ========================================================================== */
/*                             TASK ASSIGNMENTS                               */
/* ========================================================================== */

export interface TaskAssignment {

    id: number;

    taskId: number;

    userId: number;

    description: string;

    status: AssignmentStatus;

    completedAt: string | null;
}

/* ========================================================================== */
/*                               DATABASE ROOT                                */
/* ========================================================================== */

export interface Database {

    users: User[];

    groups: Group[];

    groupMembers: GroupMember[];

    tasks: Task[];

    taskAssignments: TaskAssignment[];
}

/* ========================================================================== */
/*                               RESULTS                                */
/* ========================================================================== */

export interface SuccessResult<T> {
    success: true;
    data: T;
}

export interface ErrorResult {
    success: false;
    message: string;
}

export type ServiceResult<T> =
    | SuccessResult<T>
    | ErrorResult;

/* ========================================================================== */
/*                               AUTH                                */
/* ========================================================================== */

export interface LoginRequest {

    email: string;

    password: string;

}

export interface AuthUser {

    id: number;

    name: string;

    email: string;

}

export interface AuthResponse {

    token: string;

    user: AuthUser;

}

export interface RegisterRequest {

    name: string;

    email: string;

    password: string;

}

/* ========================================================================== */
/*                               DATABASE ROOT                                */
/* ========================================================================== */

export interface DashboardData {

    totalUsers: number;

    totalGroups: number;

    totalTasks: number;

    completedTasks: number;

    pendingTasks: number;

    overdueTasks: number;

}