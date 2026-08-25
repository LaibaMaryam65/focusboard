
import CreateTaskClient from "@/components/tasks/CreateTaskClient";

export const metadata = {
  title: "Create Task",
  description:
    "Create a new task for your FocusBoard project.",
};

export default async function CreateTaskPage({
  params,
}) {
  const { projectId } = await params;

  return (
  
      <CreateTaskClient
        projectId={projectId}
      />
    
  );
}