

import TaskDetailClient from "@/components/tasks/TaskDetailClient";

export async function generateMetadata({params}){
  const {taskId}=await params;
  return{
    title: `Task ${taskId}`,
    description: "View task details in FocusBoard.",
  };
}

export default async function TaskDetailPage({
  params,
}){
  const {taskId}=await params;
  return(
    
      <TaskDetailClient taskId={taskId} />

  );
}