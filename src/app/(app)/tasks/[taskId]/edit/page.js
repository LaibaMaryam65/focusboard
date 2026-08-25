
import EditTaskClient from "@/components/tasks/EditTaskClient";

export const metadata = {
  title: "Edit Task",
  description:
    "Edit an existing FocusBoard task.",
};

export default async function EditTaskPage({
  params,
}) {
  const { taskId } = await params;

  return (
    
      <EditTaskClient
        taskId={taskId}
      />
   
  );
}