"use client";
import { useCallback, useMemo, useReducer } from "react";
import { Search, SlidersHorizontal,X } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import useDebounce from "@/hooks/useDebounce";
import ProjectCard from "./ProjectCard";
import { usePreferencesStore } from "@/stores/preferencesStore";

const FILTERS_INITIAL_STATE = {
    search: "",
    status: "all",
    sortBy: "name-asc",
};

function filtersReducer(state, action) {
    switch (action.type) {
        case "SET_SEARCH":
            return { ...state, search: action.payload };
        case "SET_STATUS":
            return { ...state, status: action.payload };
        case "SET_SORT":
            return { ...state, sortBy: action.payload };
        case "CLEAR":
            return FILTERS_INITIAL_STATE;
        default:
            return state;
    }
}

export default function ProjectsClient(){
    const [filters, dispatchFilters] = useReducer(filtersReducer, FILTERS_INITIAL_STATE);
    const { search, status, sortBy } = filters;
    const debouncedSearch = useDebounce(search, 400);
const viewMode=usePreferencesStore((state)=>state.viewMode);
    const{
        data:projects=[],
        isLoading: projectsLoading,
        isError: projectsError,
        error: projectsErrorObject, refetch: refetchProjects,
        isFetching: projectsFetching,
    }=useProjects();

    const {
        data: tasks=[],
        isLoading: tasksLoading,}=useTasks();

        const statuses=useMemo(()=>{
            const uniqueStatuses=[
                ...new Set(
                    projects
                    .map((project)=> project.status)
                    .filter(Boolean)
                ),
            ];
            return uniqueStatuses.sort();
        },[projects]);

        const taskCounts= useMemo(()=>{
            return tasks.reduce((counts, task)=>{
                if(!task.projectId){
                    return counts;
                }
                counts[task.projectId]=(counts[task.projectId] || 0)+1;
                return counts;
            },{});
        },[tasks]);

        const filteredProjects=useMemo(()=>{
            const normalizedSearch = debouncedSearch.trim().toLowerCase();
            const filtered=projects.filter((project)=>{
                const matchesSearch= !normalizedSearch || project.name ?.toLowerCase() .includes(normalizedSearch) || project.description ?.toLowerCase().includes(normalizedSearch);
                const matchesStatus= status === "all" || project.status === status;
                return matchesSearch && matchesStatus;
            });
            return [...filtered].sort((a,b)=>{
                switch(sortBy){
                    case "name-desc":
                        return b.name.localeCompare(a.name);
                        case "tasks-desc":
                            return(
                                (taskCounts[b.id] || 0)-(taskCounts[a.id] || 0)
                            );

                        case "tasks-asc":
                            return(
                                (taskCounts[a.id] || 0) - (taskCounts[b.id] || 0)
                            );
                        case "name-asc":
                            default:
                                return a.name.localeCompare(b.name)
                }
            });
        },[
            projects,
            debouncedSearch,
            status,
            sortBy,
            taskCounts,
        ]);
        const handleSearchChange = useCallback(
            (event)=>{
                dispatchFilters({ type: "SET_SEARCH", payload: event.target.value });
            },[]
        );
        const handleStatusChange = useCallback(
            (event)=>{
                dispatchFilters({ type: "SET_STATUS", payload: event.target.value });
            },[]
        );
        const handleSortChange=useCallback(
            (event)=>{
                dispatchFilters({ type: "SET_SORT", payload: event.target.value });
            },[]
        );
        const clearFilters =useCallback(()=>{
            dispatchFilters({ type: "CLEAR" });
        },[]);

        const hasFilters=
        search !== "" ||
        status !== "all" ||
        sortBy !== "name-asc";

        if(projectsLoading || tasksLoading){
            return(
                <div className="space-y-8">
                    <ProjectsHeader/>
                    <ProjectsToolbar
                    search={search}
                    status={status}
                    sortBy={sortBy}
                    statuses={statuses}
                    onSearchChange={handleSearchChange}
                    onStatusChange={handleStatusChange}
                    onSortChange={handleSortChange}
                    onClear={clearFilters}
                    hasFilters={hasFilters}
                    disabled
                    />
                    <ProjectGridSkeleton/>

                </div>
            );
        }
        if(projectsError){
            return(
                <div className="space-y-8">
                    <ProjectsHeader/>
                    <div role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/20"
                    >
                         <h2 className="font-semibold text-red-700 dark:text-red-300">
            Unable to load projects
          </h2>
             <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {projectsErrorObject?.message ||
              "Something went wrong while loading projects."}
          </p>
            <button
            type="button"
            onClick={() => refetchProjects()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try again
          </button>

                    </div>
                </div>
            )
        }
        return(
    <div className="space-y-8">
        <ProjectsHeader/>
        <ProjectsToolbar
        search={search}
        status={status}
        sortBy={sortBy}
        statuses={statuses}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
        onClear={clearFilters}
        hasFilters={hasFilters}
        />

        <div className="flex items-center justify-between">
            <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              {filteredProjects.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              {projects.length}
            </span>{" "}
            projects
          </p>
            </div>
            {projectsFetching && (
                <span className="text-xs text-gray-400">
                    Updating...
                </span>
            )}
        </div>
      
         {filteredProjects.length > 0 ? (
        <div  className={
    viewMode === "cards"
      ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      : "flex flex-col gap-3"}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              taskCount={taskCounts[project.id] || 0}
            />
          ))}</div>):(
           <EmptyProjects
          hasFilters={hasFilters}
          onClear={clearFilters}
        />
          )}
        
    </div>
);
}

function ProjectsHeader(){
    return(
        <div>
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Workspace
            </p>
             <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
        Projects
      </h1>
       <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base dark:text-gray-400">
        Browse your team projects and open a project
        to view its tasks.
      </p>
        </div>
    );
}

function ProjectsToolbar({
     search,
  status,
  sortBy,
  statuses,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onClear,
  hasFilters,
  disabled = false,
}){
    return(
        <section aria-label="Project filters"
        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <SlidersHorizontal size={17}/>
                Filter projects
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_180px_auto]">
                <div className="relative">
                    <label   htmlFor="project-search"
            className="sr-only">
                        Search Projects
                    </label>
                      <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
                <input
            id="project-search"
            type="search"
            value={search}
            onChange={onSearchChange}
            disabled={disabled}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
                </div>
                <div>
                    <label htmlFor="project-status" className="sr-only">
                        Filter by status
                    </label>
                    <select id="project-status"
                      value={status}
                      onChange={onStatusChange}
                      disabled={disabled}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300"
                      >
                         <option value="all">
              All statuses
            </option>

            {statuses.map((projectStatus) => (
              <option
                key={projectStatus}
                value={projectStatus}
              >
                {projectStatus.replace("-", " ")}
              </option>
            ))}

                    </select>
                </div>
                <div>
                    <label htmlFor="project-sort" className="sr-only">
                        Sort Projects
                    </label>
                    <select
                    id="project-sort"
                    value={sortBy}
                    onChange={onSortChange}
                    disabled={disabled}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300"
                    >
                        <option value="name-asc">
                            Name A-Z
                        </option>
                        <option value="name-desc">
              Name Z–A
            </option>

            <option value="tasks-desc">
              Most tasks
            </option>

            <option value="tasks-asc">
              Fewest tasks
            </option>
                    </select>
                </div>

                {hasFilters && (
                    <button
                    type="button"
                    onClick={onClear}
                    disabled={disabled}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    ><X size={16}/> Clear</button>
                )}
            </div>
        </section>
    );
}

function ProjectGridSkeleton(){
    return(
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[1,2,3,4,5,6].map((item)=>(
                <div key={item}
                className="h-64 animate-pulse rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900"/>
            ))}
        </div>
    );
}


function EmptyProjects({hasFilters, onClear}){
    return(
        <div className="rounded-xl border border-dashed border-gray-300 px-6 py-14 text-center dark:border-gray-700">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <Search size={22} className="text-gray-500"/>

            </div>
             <h2 className="mt-4 font-semibold text-gray-900 dark:text-white">
        No projects found
      </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
        {hasFilters
          ? "Try changing your search or filters to find a project."
          : "There are no projects available right now."}
      </p>

      {hasFilters && (
        <button type="button"
        onClick={onClear}
        className="mt-5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Clear filters
        </button>
      )}

        </div>
    )
}