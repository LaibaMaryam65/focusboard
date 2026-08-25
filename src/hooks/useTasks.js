

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks, getTask, createTask, updateTask, deleteTask } from "@/lib/api/tasks";

export function useTasks(projectId){
    return useQuery({
        queryKey: ["tasks", projectId],
        queryFn: () => getTasks(projectId),
        staleTime: 0,
        refetchOnMount: "always",
        refetchOnWindowFocus: false,
    });
}

export function useTask(taskId) {
    return useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTask(taskId),
        enabled: Boolean(taskId),
        staleTime: 0,
        refetchOnMount: "always",
        refetchOnWindowFocus: false,
    });
}

export function useCreateTask(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}

export function useUpdateTask(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (variables) => updateTask(variables),
        onSuccess: (result, variables) => {
            const updatedTask = result?.data || result;
            queryClient.setQueryData(["task", String(variables.taskId)], updatedTask);
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}
export function useDeleteTask(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (taskId) => deleteTask(taskId),

        // Optimistically remove the task from every cached task list immediately,
        // so the UI updates without waiting for the request to finish.
        onMutate: async (taskId) => {
            await queryClient.cancelQueries({ queryKey: ["tasks"] });

            // Snapshot every "tasks" query currently cached (there can be more
            // than one — e.g. per-project lists and the dashboard's list)
            const previousTaskLists = queryClient.getQueriesData({ queryKey: ["tasks"] });

            previousTaskLists.forEach(([queryKey, data]) => {
                if (!data) return;
                queryClient.setQueryData(
                    queryKey,
                    data.filter((task) => task.id !== taskId)
                );
            });

            return { previousTaskLists };
        },

        // Roll back to the snapshot if the delete actually fails on the server.
        onError: (err, taskId, context) => {
            context?.previousTaskLists?.forEach(([queryKey, data]) => {
                queryClient.setQueryData(queryKey, data);
            });
        },

        onSuccess: (data, taskId) => {
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ["tasks"] });
                queryClient.removeQueries({ queryKey: ["task", taskId] });
                queryClient.invalidateQueries({ queryKey: ["projects"] });
            }, 100);
        },
    });
}