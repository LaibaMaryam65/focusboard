"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";

import TaskForm from "@/components/tasks/TaskForm";
import { useCreateTask } from "@/hooks/useTasks";

export default function CreateTaskClient({
  projectId,
}) {
  const router = useRouter();

  const createMutation = useCreateTask();

  async function handleSubmit(formData) {
  
    try {
      const createdTask =
        await createMutation.mutateAsync({
          ...formData,
          projectId: String(projectId),
        });

      toast.success("Task created successfully");


      router.push(
        `/projects/${projectId}`
      );

      
      router.refresh();

      return createdTask;
    } catch (error) {
      toast.error(
        error?.message ||
          "Failed to create task"
      );
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
    
      <div>
        <Link
          href={`/projects/${projectId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Project
        </Link>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
            <Plus size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create Task
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add a new task to this project.
            </p>
          </div>
        </div>
      </div>

     
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 dark:border-gray-800 dark:bg-gray-900">
        <TaskForm
          mode="create"
          onSubmit={handleSubmit}
          isSubmitting={
            createMutation.isPending
          }
          onCancel={() =>
            router.push(
              `/projects/${projectId}`
            )
          }
        />
      </section>
    </div>
  );
}