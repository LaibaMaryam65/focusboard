import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/api/projects";
import { getTasks } from "@/lib/api/tasks";

export function useProjectDetail(projectId){
    const projectsQuery=useQuery({
        queryKey:["projects"],
        queryFn: getProjects,
    });
    const tasksQuery=useQuery({
        queryKey:["tasks", {projectId}],
        queryFn:()=> getTasks(projectId),
        enabled: Boolean(projectId),
    });

    const project=projectsQuery.data?.find((item)=> String(item.id)=== String(projectId));
    return{
        project,
        tasks: tasksQuery.data || [],

        isLoading:
        projectsQuery.isLoading ||
        tasksQuery.isLoading,

        isError:
        projectsQuery.isError ||
        tasksQuery.isError,

        error:
        projectsQuery.error ||
        tasksQuery.error,

        refetch:()=>{
            projectsQuery.refetch();
            tasksQuery.refetch();
        },
        isFetching:
        projectsQuery.isFetching ||
        tasksQuery.isFetching,
    }

}