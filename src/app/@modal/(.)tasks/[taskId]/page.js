import TaskModal from "@/components/tasks/TaskModal";

export default async function TaskModalPage({
    params,
}){
    const {taskId}=await params;
    return(
        <TaskModal taskId={taskId}/>
    );
}