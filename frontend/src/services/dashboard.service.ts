import {
    getAll as getUsers
} from "./user.service";

import {
    getAll as getGroups
} from "./group.service";

import {
    getAll as getTasks,
    getCompleted,
    getPending,
    getOverdue
} from "./task.service";

import type {
    DashboardData
} from "../mock/types";

/* ========================================================================== */
/*                                 DASHBOARD                                  */
/* ========================================================================== */

/**
 * Retorna os dados do dashboard.
 */
export function getDashboard(): DashboardData {

    return {

        totalUsers: getUsers().length,

        totalGroups: getGroups().length,

        totalTasks: getTasks().length,

        completedTasks: getCompleted().length,

        pendingTasks: getPending().length,

        overdueTasks: getOverdue().length

    };

}