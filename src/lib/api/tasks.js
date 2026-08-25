

export async function getTasks(projectId) {
    const url = projectId ? `/api/tasks?projectId=${encodeURIComponent(projectId)}` : "/api/tasks";

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to load tasks.");
    }
    const result = await response.json();

    if (!result.success) {
        throw new Error(result.message || "Failed to load tasks.");
    }
    return result.data;
}

export async function getTask(taskId) {
    const response = await fetch(`/api/tasks/${taskId}`);

    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }
        throw new Error("Failed to load task");
    }
    const result = await response.json();
    if (!result.success) {
        throw new Error(result.message || "Failed to load task.");
    }
    return result.data;
}

export async function createTask(taskData){
    const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create task.");
    }
    return result.data;
}

export async function updateTask(variables) {
    const { taskId, ...taskData } = variables;

    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update task.");
    }

    return result.data;
}

export async function deleteTask(taskId) {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete task");
    }
    return result.data;
}
