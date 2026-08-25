import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";

export default function ProjectCard({ project, taskCount }) {
    return (
        <article className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                        <FolderKanban size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h2 className="truncate text-base font-semibold text-gray-900 dark:text-white" title={project.name}>
                            {project.name}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {taskCount} {taskCount === 1 ? "task" : "tasks"}
                        </p>
                    </div>
                </div>
                {project.status && (
                
                    <span className="shrink-0 self-start sm:self-auto rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {project.status.replace("-", " ")}
                    </span>
                )}
            </div>

            
            <p className="mt-5 line-clamp-3 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-400 break-words">
                {project.description || "No description available."} 
            </p>

            <div className="mt-5 border-t border-gray-100 pt-4 dark:border-gray-800">
              
                <Link href={`/projects/${project.id}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                    View Tasks
                    <ArrowRight size={16} />
                </Link>
            </div>
        </article>
    );
}
