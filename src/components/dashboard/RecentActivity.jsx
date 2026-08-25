"use client";
import { useMemo } from "react";
import { ListChecks } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";

function formatDate(dateString){
    const date=new Date(dateString);

    return new Intl.DateTimeFormat("en",{
        month: "short",
        day:"numeric",
    }).format(date);
}
function getStatusLabel(status){
    const labels={
        todo:"To do",
        "in-progress":"In progress",
        completed:"Completed",
    };
    return labels[status] || status;
}

export default function RecentActivity(){
    const{
        data: tasks,
        isLoading,
        isFetching,
    }=useTasks();

    const recentTasks =useMemo(()=>{
        if(!tasks){
            return[];
        }
        return [...tasks]
        .sort(
            (a,b)=>
                new Date(b.createdAt)- new Date(a.createdAt)
        )
        .slice(0,5);
    },[tasks]);

    if(isLoading){
        return(
            <section className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-800">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {[1,2,3].map((item) => (
                        <div key={item} className="h-16 animate-pulse bg-gray-100 px-5 py-4 dark:bg-gray-800" />
                    ))}
                </div>
            </section>
        );
    }

    return(
        <section className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
                <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                        Recent Activity
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Latest task activity from your team.
                    </p>
                </div>
                {isFetching && (
                    <span className="text-xs text-gray-400">
                        Updating...
                    </span>
                )}
            </div>

            {recentTasks.length === 0 ? (
                <div className="px-6 py-14 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                        <ListChecks size={22} className="text-gray-500" />
                    </div>
                    <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
                        No activity yet
                    </h3>
                    <p className="mx-auto mt-2 max-w-xs text-sm text-gray-500 dark:text-gray-400">
                        Task updates from your team will show up here as soon as something happens.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {recentTasks.map((task) => (
                        <div key={task.id} className="px-5 py-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-500" />

                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {task.title}
                                    </p>

                                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span>{task.assignee}</span>
                                        <span>.</span>
                                        <span>{getStatusLabel(task.status)}</span>
                                        <span>.</span>
                                        <span>{formatDate(task.createdAt)}</span>
                                    </div>
                                </div>

                                <span
                                    className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
                                        task.priority === "high"
                                            ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                                            : task.priority === "medium"
                                                ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                    }`}
                                >
                                    {task.priority}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}