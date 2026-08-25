"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, CheckCircle2,Circle, Clock3,Edit3,Trash2,User,FolderKanban } from "lucide-react";
import {toast} from "sonner";
import { useState } from "react";

import { useDeleteTask, useTask } from "@/hooks/useTasks";

export default function TaskDetailClient({
    taskId,
}){
    const router = useRouter();
     const [isRemoving, setIsRemoving] = useState(false);
      const deleteMutation = useDeleteTask();

    const{
        data: task,
        isLoading,
        isError,
        error,
        refetch,
    }=useTask(taskId, { enabled: Boolean(taskId) && !isRemoving });
   

    async function handleDelete(){
        const confirmed= window.confirm(
            "Are you sure you want to delete this task?"
        );
        if(!confirmed){
            return;
        }
        try{
             setIsRemoving(true);
            await deleteMutation.mutateAsync(
                String(taskId)
            );
            toast.success(
                "Task deleted Successfully"
            );
            if(task?.projectId){
                router.push(`/projects/${task.projectId}`);
            }else{
                router.push("/projects");
            }
            router.refresh();
        }catch(deleteError){
            setIsRemoving(false);
            toast.error(
                deleteError?.message || "Failed to delete task"
            );
        }
    }
    if(isLoading){
        return <TaskDetailSkeleton/>;
    }
    if(isError){
        return(
            <TaskDetailError message={
                error?.message || "Unable to load this task."
            }
            onRetry={refetch} />
        );
    }

    if(!task){
        return <TaskNotFound/>;
    }

    return(
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Link   href={
          task.projectId
            ? `/projects/${task.projectId}`
            : "/projects"}>
            <ArrowLeft size={16}/>
            Back to Project
            </Link>

            <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="border-b border-gray-100 p-5 sm:p-7 dark:border-gray-800">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                <StatusBadge status={task.status} />
                                <PriorityBadge priority={task.priority} />
                            </div>
                            <h1 className="break-words text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                                 {task.title}
                            </h1>
                            {task.projectName && (
                                <p className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                      <FolderKanban size={15} />
                                        {task.projectName}
                                </p>
                            )}
                        </div>
                        <div className="flex shrink-0 gap-2">
                            <Link  href={`/tasks/${taskId}/edit`}
                              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                            <Edit3 size={16} />
                                <span>Edit</span>
                            </Link>

                            <button
                               type="button"
                               onClick={handleDelete}
                                 disabled={
                                     deleteMutation.isPending
                                          }
                                 className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3.5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30"
                             >
                                 <Trash2 size={16} />

                                      <span>
                                       {deleteMutation.isPending
                                          ? "Deleting..."
                                        : "Delete"}
                                         </span>

                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-5 sm:p-7">
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Description
            </h2>

            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-700 dark:text-gray-300">
              {task.description ||
                "No description provided."}
            </p>
                    </section>

                     <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <InfoItem
              icon={<User size={18} />}
              label="Assignee"
              value={
                task.assignee ||
                "Unassigned"
              }
            />

            <InfoItem
              icon={<CalendarDays size={18} />}
              label="Due date"
              value={
                formatDate(task.dueDate) ||
                "No due date"
              }
            />

            <InfoItem
              icon={
                <Clock3 size={18} />
              }
              label="Status"
              value={formatStatus(task.status)}
            />

            <InfoItem
              icon={
                <CheckCircle2 size={18} />
              }
              label="Priority"
              value={formatPriority(
                task.priority
              )}
            />
          </div>
                </div>
            </article>
        </div>
    );
}


function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950">
      <div className="mt-0.5 text-gray-500 dark:text-gray-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const config = {
    todo: {
      label: "To Do",
      className:
        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    },

    "in-progress": {
      label: "In Progress",
      className:
        "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
    },

    completed: {
      label: "Completed",
      className:
        "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300",
    },
  };

  const current =
    config[status] || config.todo;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${current.className}`}
    >
      <Circle size={8} fill="currentColor" />
      {current.label}
    </span>
  );
}



function PriorityBadge({ priority }) {
  const config = {
    low: {
      label: "Low Priority",
      className:
        "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    },

    medium: {
      label: "Medium Priority",
      className:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300",
    },

    high: {
      label: "High Priority",
      className:
        "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300",
    },
  };

  const current =
    config[priority] || config.medium;

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${current.className}`}
    >
      {current.label}
    </span>
  );
}

function TaskDetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-4xl animate-pulse space-y-6">
      <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-800" />

      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-100 p-7 dark:border-gray-800">
          <div className="h-6 w-28 rounded bg-gray-200 dark:bg-gray-800" />

          <div className="mt-4 h-9 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="space-y-5 p-7">
          <div className="h-5 w-28 rounded bg-gray-200 dark:bg-gray-800" />

          <div className="h-24 rounded bg-gray-100 dark:bg-gray-800" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-20 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-20 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-20 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-20 rounded bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}



function TaskDetailError({
  message,
  onRetry,
}) {
  return (
    <div
      role="alert"
      className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/20"
    >
      <h1 className="text-lg font-semibold text-red-700 dark:text-red-300">
        Unable to load task
      </h1>

      <p className="mt-2 text-sm text-red-600 dark:text-red-400">
        {message}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Try Again
        </button>

        <Link
          href="/projects"
          className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-700 dark:border-red-900 dark:text-red-300"
        >
          Projects
        </Link>
      </div>
    </div>
  );
}

function TaskNotFound() {
  return (
    <div
      role="status"
      className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900"
    >
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        Task not found
      </h1>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        This task may have been deleted or
        does not exist.
      </p>

      <Link
        href="/projects"
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>
    </div>
  );
}

function formatDate(date) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

function formatStatus(status) {
  const labels = {
    todo: "To Do",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return labels[status] || status;
}

function formatPriority(priority) {
  if (!priority) {
    return "";
  }

  return (
    priority.charAt(0).toUpperCase() +
    priority.slice(1)
  );
}