"use client";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, Circle, Clock3, ListTodo, Plus, } from "lucide-react";

import { useProjectDetail } from "@/hooks/useProjectDetail";

export default function ProjectDetailClient({projectId,}){
    const{
        project,
        tasks,
        isLoading,
        isError,
        error,
        refetch,isFetching
    }=useProjectDetail(projectId);

    // if(isLoading){
    //     return null;
    // }
    if(isLoading){
        return (
            <div className="space-y-6 animate-pulse">
                {/* Back Link Skeleton */}
                <div className="h-5 w-28 bg-gray-200 dark:bg-gray-800 rounded" />
                
                {/* Project Header Skeleton */}
                <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-3 w-full max-w-xl">
                            <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded-full" />
                            <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
                            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                        </div>
                        <div className="h-10 w-28 bg-gray-200 dark:bg-gray-800 rounded-lg shrink-0" />
                    </div>
                </section>

                {/* Summary Cards Skeleton */}
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
                                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-800 rounded" />
                            </div>
                            <div className="h-8 w-12 bg-gray-200 dark:bg-gray-800 rounded" />
                        </div>
                    ))}
                </section>

                {/* Tasks List Skeleton */}
                <section className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                    <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800 flex justify-between items-center">
                        <div className="space-y-2">
                            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
                            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
                        </div>
                        <div className="h-5 w-14 bg-gray-200 dark:bg-gray-800 rounded-full" />
                    </div>
                    <div className="p-5 space-y-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <div className="flex items-start gap-3 w-full">
                                    <div className="h-5 w-5 bg-gray-200 dark:bg-gray-800 rounded-full shrink-0" />
                                    <div className="space-y-2 w-1/2">
                                        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                                        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
                                    </div>
                                </div>
                                <div className="h-9 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        );
    }
    if(isError){
        return(
            <ProjectClientError
            message={error?.message}
            onRetry={refetch}
            />
        );
    }
    if(!project){
        return null;
    }
    const totalTasks=tasks.length;

    const completedTasks=tasks.filter(
        (task)=> task.status ==="completed"
    ).length;

    const openTasks=tasks.filter(
        (task)=>task.status !== "completed").length;

        const overdueTasks = tasks.filter((task)=>{
            if(!task.dueDate || task.status === "completed"){
                return false;
            }
            return new Date(task.dueDate) < new Date();
        }).length;
        return(
            <div className="space-y-6">
                <Link href="/projects"
                 className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-white"
                 >
                    <ArrowLeft size={16}/>
                    Back to Projects
                </Link>

                <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium cpitalize text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                                    {project.status?.replace("-"," ") || "Active"}
                                </span>
                                {isFetching && (
                                    <span className="text-xs text-gray-400">
                                        Updating...
                                    </span>
                                )}
                            </div>
                            <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                                {project.name}
                            </h1>
                            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500 sm:text-base dark:text-gray-400">
                                {project.description || "No project description available."}
                            </p>
                        </div>
                        <Link
                        href={`/projects/${project.id}/tasks/new`}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <Plus size={17}/>
                            Add task
                        </Link>
                    </div>
                </section>

                <section
        aria-label="Task summary"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <SummaryCard
          label="Total Tasks"
          value={totalTasks}
          icon={<ListTodo size={19} />}
        />

        <SummaryCard
          label="Open Tasks"
          value={openTasks}
          icon={<Circle size={19} />}
        />

        <SummaryCard
          label="Completed"
          value={completedTasks}
          icon={<CheckCircle2 size={19} />}
        />

        <SummaryCard
          label="Overdue"
          value={overdueTasks}
          icon={<Clock3 size={19} />}
        />
      </section>

      <section className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-100 px-5 py-4 sm:px-6 dark:border-gray-800">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Project Tasks
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Tasks belonging to this project.
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {totalTasks}{" "}
              {totalTasks === 1 ? "task" : "tasks"}
            </span>
          </div>
        </div>

        {tasks.length === 0 ? (
          <EmptyTasks projectId={project.id} />
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
              />
            ))}
          </div>
        )}
      </section>

            </div>
        );

}

function SummaryCard({label,value,icon,}){
    return(
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {label}
                </p>
                <span className="text-gray-400 dark:text-gray-500">
                    {icon}
                </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {value}
            </p>
        </div>
    );
}

function TaskRow({task}){
    const isCompleted=task.status==="completed";
    const isOverdue= task.dueDate && !isCompleted && new Date(task.dueDate) < new Date();

    return(
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex min-w-0 items-start gap-3">
                <div 
                 className={`mt-0.5 shrink-0 ${
            isCompleted
              ? "text-green-500"
              : "text-gray-400"
          }`}>
                    {isCompleted ?(<CheckCircle2 size={20}/>):(<Circle size={20}/>)}
                </div>
                <div className="min-w-0">
                    <h3 className={`truncate font-medium ${
              isCompleted
                ? "text-gray-400 line-through"
                : "text-gray-900 dark:text-white"
            }`}>
                        {task.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        <StatusBadge status={task.status}/>
                        <PriorityBadge priority={task.priority}/>

                        {task.dueDate && (
                            <span className={`inline-flex items-center gap-1 text-xs ${
                  isOverdue
                    ? "font-medium text-red-600 dark:text-red-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}>
                                <CalendarDays size={13}/>
                                {formatDate(task.dueDate)}
                                {isOverdue && ". Overdue"}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <Link 
            href={`/tasks/${task.id}`}
            prefetch={false}
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
            View Task
            </Link>
        </div>
    );
}

function StatusBadge({status}){
    if(!status){
        return null;
    }
    return(
    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-600 dark:bg-gray-800 dark:text-gray-300">
        {status.replace("-"," ")}
    </span>
    );
}

function PriorityBadge({priority}){
    if(!priority){
        return null;
    }
    return(
        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium capitalize text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
            {priority}
        </span>
    );
}

function EmptyTasks({projectId}){
    return(
        <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <ListTodo size={22}
                className="text-gray-500"/>
            </div>
            <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
        No tasks yet
      </h3>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Add the first task to this project.
      </p>
      <Link
        href={`/projects/${projectId}/tasks/new`}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <Plus size={16} />
        Add Task
      </Link>
        </div>
    )
}

function ProjectClientError({message,onRetry}){
    return(
        <div>
            <h2  className="font-semibold text-red-700 dark:text-red-300">
                Could not load project.
            </h2>
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {message || "something went wrong while loading the project."}
            </p>

            <button   type="button"
        onClick={() => onRetry()}
        className="mt-4 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Try Again
            </button>
        </div>
    );
}

function formatDate(date){
    return new Intl.DateTimeFormat("en",{
        month:"short",
        day:"numeric",
        year:"numeric",
    }).format(new Date(date));
}