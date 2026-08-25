
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";

export const metadata = {
  title: "Project Details",
  description:
    "View project information and tasks in FocusBoard.",
};

export default async function ProjectDetailPage({
  params,
}) {
  const { projectId } = await params;

  return (
    
      <ProjectDetailClient projectId={projectId} />
   
  );
}