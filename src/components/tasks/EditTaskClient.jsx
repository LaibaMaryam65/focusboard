"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit3 } from "lucide-react";
import { toast } from "sonner";

import TaskForm from "./TaskForm";
import { useTask, useUpdateTask } from "@/hooks/useTasks";

export default function EditTaskClient({ taskId }) {
    const router = useRouter();

    const {
        data: task,
        isLoading,
        isError,
        error,
    } = useTask(taskId);

    const updateMutation = useUpdateTask();

   
    function getReturnPath() {
        if (task?.projectId) {
            return `/projects/${task.projectId}`;
        }

        return "/projects";
    }

  
    async function handleSubmit(formData) {
        try {
            await updateMutation.mutateAsync({
                taskId: String(taskId),
                ...formData,
            });

            toast.success("Task updated successfully");

        
            router.push(`/tasks/${taskId}`);
        } catch (error) {
            toast.error(
                error?.message || "Failed to update task"
            );
        }
    }

    
    if (isLoading) {
        return (
            <div className="mx-auto w-full max-w-3xl">
                <div className="animate-pulse space-y-5">
                    <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />

                    <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-800" />

                    <div className="rounded-xl border border-gray-200 p-7 dark:border-gray-800">
                        <div className="space-y-5">
                            <div className="h-11 rounded bg-gray-100 dark:bg-gray-800" />

                            <div className="h-32 rounded bg-gray-100 dark:bg-gray-800" />

                            <div className="h-11 rounded bg-gray-100 dark:bg-gray-800" />

                            <div className="h-11 rounded bg-gray-100 dark:bg-gray-800" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    
    if (isError) {
        return (
            <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/20"
            >
                <h2 className="font-semibold text-red-700 dark:text-red-300">
                    Unable to load task
                </h2>

                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {error?.message ||
                        "Something went wrong while loading this task."}
                </p>

                <Link
                    href="/projects"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white"
                >
                    <ArrowLeft size={16} />
                    Back to Projects
                </Link>
            </div>
        );
    }

    if (!task) {
        return (
            <div
                role="alert"
                className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-900 dark:bg-yellow-950/20"
            >
                <h2 className="font-semibold text-yellow-700 dark:text-yellow-300">
                    Task not found
                </h2>

                <p className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
                    The task you are trying to edit does not exist.
                </p>

                <Link
                    href="/projects"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white"
                >
                    <ArrowLeft size={16} />
                    Back to Projects
                </Link>
            </div>
        );
    }

   
    return (
        <div className="mx-auto w-full max-w-3xl space-y-6">

            <div>
               
                <button
                    type="button"
                    onClick={() => router.push(getReturnPath())}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-white"
                >
                    <ArrowLeft size={16} />
                    Back to Project
                </button>

                <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                        <Edit3 size={19} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Edit Task
                        </h1>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Update the task information.
                        </p>
                    </div>
                </div>
            </div>

            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 dark:border-gray-800 dark:bg-gray-900">
                <TaskForm
                    key={task.id}
                    mode="edit"
                    initialData={task}
                    onSubmit={handleSubmit}
                    isSubmitting={updateMutation.isPending}
                    onCancel={() => router.push(getReturnPath())}
                />
            </section>
        </div>
    );
}