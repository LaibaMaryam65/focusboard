import Link from "next/link";

export default function ProjectOverview({ projects, tasks }) {
    const getProjectTaskCount = (projectId) => {
        return tasks.filter((task) => task.projectId === projectId).length;
    };

    return (
        <section className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 w-full overflow-hidden">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 px-4 py-4 sm:px-5 dark:border-gray-800">
                <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                        Projects
                    </h2>
                    <p className="mt-0.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Overview of your current projects.
                    </p>
                </div>
                <Link href="/projects"
                    className="w-fit text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                    View all
                </Link>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800/50">
                {projects.slice(0, 5).map((project) => {
                    const taskCount = getProjectTaskCount(project.id);
                    return (
                        <Link key={project.id}
                            href={`/projects/${project.id}`}
                            className="block px-4 py-4 sm:px-5 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-gray-800/50">
                            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 min-w-0">
                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                                        {project.name}
                                    </h3>
                                    <p className="mt-0.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 sm:truncate">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="shrink-0 self-start sm:self-center sm:text-right mt-1 sm:mt-0">
                                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20">
                                        {taskCount} {taskCount === 1 ? "task" : "tasks"}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    );
}
