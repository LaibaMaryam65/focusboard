"use client";

import {useMemo} from "react";
import Link from "next/link";
import{
    FolderKanban,
    ListTodo,
    AlertTriangle,
    ArrowRight,
} from "lucide-react";

import {useProjects} from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import RecentActivity from "./RecentActivity";
import ProjectOverview from "./ProjectOverview";

export default function DashboardClient({
    initialProjects,
    initialTasks,
}){
    const{
        data:projects=initialProjects,
        isLoading:projectsLoading,
        isError:projectsError,
        error:projectsErrorObject,
    }=useProjects();

    const {
        data:tasks=initialTasks,
        isLoading: tasksLoading,
        isError:tasksError,
        error:tasksErrorObject,
        refetch: refetchTasks,
    }=useTasks();

    const openTasks=useMemo(()=>{
        return tasks.filter(
            (task)=>task.status !== "completed"
        ).length;
    },[tasks]);

    const overdueTasks= useMemo(()=>{
        const today = new Date();
        today.setHours(0,0,0,0);
        return tasks.filter((task)=>{
            if(task.status === "completed"){
                return false;
            }
            const dueDate = new Date(task.dueDate);
            dueDate.setHours(0,0,0,0);
            return dueDate < today;
        }).length;
    },[tasks]);

    const totalProjects = projects.length;
    const isLoading= projectsLoading || tasksLoading;

    const hasError= projectsError || tasksError;

    if(isLoading){
        return(
            <div className="space-y-8">
                <DashboardHeader/>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {[1,2,3].map((item)=>(
                        <div key={item}
                        className="h-32 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"/>
                    ))}
                </div>
                <div className="grid gap-6 xl:grid-cols-2">
                    <div className="h-80 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"/>
                        <div className="h-80 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"/>
                </div>
            </div>
        );
    }
    if (hasError){
        const message=
        projectsErrorObject?.message ||
        tasksErrorObject?.message ||
        "Something went wrong";
        return(
            <div>
                <DashboardHeader/>
                <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/20">
                <h2 className="font-semibold text-red-700 dark:text-red-300">
                   Dashboard data could not be loaded 
                </h2>
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {message}
                </p>
                <button  type="button"
            onClick={() => refetchTasks()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Try again
                </button>
                </div>
            </div>
        );
    }
    return(
        <div className="space-y-8">
            <DashboardHeader/>
            <section aria-label="Dashboard summary"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard title="Projects"
          value={totalProjects}
          description="Total projects in your workspace"
          icon={<FolderKanban size={20} />}
          href="/projects"/>

            <StatCard
          title="Open Tasks"
          value={openTasks}
          description="Tasks that still need attention"
          icon={<ListTodo size={20} />}
          variant="warning"
        />

        <StatCard
          title="Overdue Tasks"
          value={overdueTasks}
          description={
            overdueTasks === 0
              ? "Everything is on schedule"
              : "Tasks past their due date"
          }
          icon={<AlertTriangle size={20} />}
          variant={
            overdueTasks > 0
              ? "danger"
              : "success"
          }
        />
            </section>
            <section className="space-y-6">
                <ProjectOverview projects={projects} tasks={tasks}/>
                <RecentActivity/>
            </section>
            <section  className="rounded-xl bg-indigo-600 p-6 text-white shadow-sm">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Keep your team moving
                        </h2>
                        <p className="mt-1 max-w-xl text-sm text-indigo-100">
                             Review your projects and make sure important
              tasks are moving forward.
                        </p>
                    </div>
                    <Link href="/projects"
                    className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                    View projects
                    <ArrowRight size={16}/>
                    </Link>
                </div>

            </section>
        </div>
    );
}