


import DashboardClient from "@/components/dashboard/DashboardClient";

import { projects } from "@/data/projects";
import { tasks } from "@/data/tasks";

export const metadata = {
  title: "Dashboard",
  description:
    "FocusBoard team project and task dashboard.",
};

export default function DashboardPage() {
  return (
   
      <DashboardClient
        initialProjects={projects}
        initialTasks={tasks}
      />
  
  );
}