"use client"

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, ArrowLeft, CalendarDays, Edit3, User, Clock3, Trash2, } from "lucide-react";
import { toast } from "sonner";

import { useDeleteTask, useTask } from "@/hooks/useTasks";

export default function TaskModal({
    taskId,
}){
    const router=useRouter();
    const closeButtonRef=useRef(null);
    const{
        data:task,
        isLoading,
        isError,
        error,
    }=useTask(taskId);

    const deleteMutation= useDeleteTask();

    useEffect(()=>{
        closeButtonRef.current?.focus();
    },[]);
    useEffect(()=>{
        function handleKeyDown(event){
            if(event.key === "Escape"){
                router.back();
            }
        }
        document.addEventListener(
            "keydown",
            handleKeyDown
        );
        return ()=>{
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    },[router]);
    function closeModal(){
        router.back();
    }
    async function handleDelete(){
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );
        if(!confirmed){
            return;
        }
        try{
            await deleteMutation.mutateAsync(
                String(taskId)
            );
            toast.success(
                "Task deleted successfully"
            );
            router.back();
        }catch(deleteError){
            toast.error(
                deleteError?.message || "Failed to delete task"
            );
        }
    }
useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = "unset";
  };
}, []);
    return(
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
        role="presentation"
        onMouseDown={(event)=>{
            if(
                event.target === event.currentTarget
            ){
                closeModal();
            }
        }}>
            <div role="dialog"
            aria-modal="true"
            aria-labelledby="task-modal-title"
            className="max-h-[95vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-2xl dark:bg-gray-900"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-6 dark:border-gray-800 dark:bg-gray-900/95">
          <div className="flex items-center gap-3">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeModal}
              aria-label="Close task details"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <X size={19} />
            </button>

            <h2
              id="task-modal-title"
              className="text-base font-semibold text-gray-900 dark:text-white"
            >
              Task Details
            </h2>
          </div>

          {/* {task && (
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/tasks/${taskId}/edit`
                )
              }
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Edit3 size={15} />
              Edit
            </button>
          )} */}

        <a
    href={`/tasks/${taskId}/edit`}
    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
>
    <Edit3 size={15} />
    Edit
</a>

        </div>

             <div className="p-5 sm:p-6">
          {isLoading && (
            <ModalSkeleton />
          )}

          {isError && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-900 dark:bg-red-950/20"
            >
              <h3 className="font-semibold text-red-700 dark:text-red-300">
                Unable to load task
              </h3>

              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {error?.message ||
                  "Something went wrong."}
              </p>
            </div>
          )}

          {!isLoading &&
            !isError &&
            !task && (
              <div
                role="status"
                className="py-10 text-center"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Task not found
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  This task may have been deleted.
                </p>
              </div>
            )}

          {!isLoading &&
            !isError &&
            task && (
              <div className="space-y-6">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {formatStatus(
                      task.status
                    )}
                  </span>

                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                    {formatPriority(
                      task.priority
                    )}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {task.title}
                  </h1>

                  {task.projectName && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {task.projectName}
                    </p>
                  )}
                </div>

                {/* Description */}
                <section>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Description
                  </h3>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {task.description ||
                      "No description provided."}
                  </p>
                </section>

                {/* Metadata */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <ModalInfo
                    icon={<User size={17} />}
                    label="Assignee"
                    value={
                      task.assignee ||
                      "Unassigned"
                    }
                  />

                  <ModalInfo
                    icon={
                      <CalendarDays
                        size={17}
                      />
                    }
                    label="Due Date"
                    value={
                      formatDate(
                        task.dueDate
                      ) ||
                      "No due date"
                    }
                  />

                  <ModalInfo
                    icon={
                      <Clock3 size={17} />
                    }
                    label="Status"
                    value={formatStatus(
                      task.status
                    )}
                  />

                  <ModalInfo
                    icon={
                      <ArrowLeft
                        size={17}
                      />
                    }
                    label="Priority"
                    value={formatPriority(
                      task.priority
                    )}
                  />
                </div>

                {/* Delete */}
                <div className="border-t border-gray-100 pt-5 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={
                      deleteMutation.isPending
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3.5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    <Trash2 size={16} />

                    {deleteMutation.isPending
                      ? "Deleting..."
                      : "Delete Task"}
                  </button>
                </div>
              </div>
            )}
            </div>
            
            </div>
        </div>
    );
}

function ModalInfo({
    icon, label, value,
}){
    return(
        <div  className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3.5 dark:border-gray-800 dark:bg-gray-950">
              <span className="text-gray-500 dark:text-gray-400">
        {icon}
      </span>
      <div>
         <p className="text-xs text-gray-500 dark:text-gray-400">
          {label}
        </p>

        <p className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
        </div>
    );
}

function ModalSkeleton(){
   return (
    <div className="animate-pulse space-y-6">
      <div className="flex gap-2">
        <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-6 w-24 rounded-full bg-gray-200 dark:bg-gray-800" />
      </div>

      <div>
        <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mt-3 h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-16 rounded bg-gray-100 dark:bg-gray-800" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="h-16 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-16 rounded bg-gray-100 dark:bg-gray-800" />
      </div>
    </div>
  ); 
}

function formatDate(date) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

function formatStatus(status) {
  const labels = {
    todo: "To Do",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return labels[status] || status;
}

function formatPriority(priority) {
  if (!priority) {
    return "";
  }

  return (
    priority.charAt(0).toUpperCase() +
    priority.slice(1) +
    " Priority"
  );
}