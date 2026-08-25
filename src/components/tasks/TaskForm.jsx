

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import { taskSchema } from "@/lib/validations/taskSchema";

const DEFAULT_VALUES = {
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    assignee: "",
    dueDate: "",
};

export default function TaskForm({
    mode = "create",
    initialData = null,
    onSubmit,
    isSubmitting = false,
    onCancel,
}){
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues: initialData
            ? {
                title: initialData.title || "",
                description: initialData.description || "",
                status: initialData.status || "todo",
                priority: initialData.priority || "medium",
                assignee: initialData.assignee || "",
                dueDate: initialData.dueDate || "",
            }
            : DEFAULT_VALUES,
    });

    const isEdit = mode === "edit";

    return (
        <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className="space-y-6"
            noValidate
        >
            <FormField
                label="Task title"
                htmlFor="title"
                error={errors.title?.message}
                required
            >
                <input
                    id="title"
                    type="text"
                    placeholder="Enter a title"
                    {...register("title")}
                    aria-invalid={Boolean(errors.title)}
                    className={inputClass(Boolean(errors.title))}
                />
            </FormField>

            <FormField
                label="Description"
                htmlFor="description"
                error={errors.description?.message}
                required
            >
                <textarea
                    id="description"
                    rows={5}
                    placeholder="Describe what needs to be done..."
                    {...register("description")}
                    aria-invalid={Boolean(errors.description)}
                    className={inputClass(Boolean(errors.description)) + " resize-y"}
                />
            </FormField>

            <div className="grid gap-5 md:grid-cols-2">
                <FormField
                    label="Status"
                    htmlFor="status"
                    error={errors.status?.message}
                    required
                >
                    <select
                        id="status"
                        {...register("status")}
                        aria-invalid={Boolean(errors.status)}
                        className={inputClass(Boolean(errors.status))}
                    >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </FormField>

                <FormField
                    label="Priority"
                    htmlFor="priority"
                    error={errors.priority?.message}
                    required
                >
                    <select
                        id="priority"
                        {...register("priority")}
                        aria-invalid={Boolean(errors.priority)}
                        className={inputClass(Boolean(errors.priority))}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </FormField>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <FormField
                    label="Assignee"
                    htmlFor="assignee"
                    error={errors.assignee?.message}
                    required
                >
                    <input
                        id="assignee"
                        type="text"
                        placeholder="Enter an assignee"
                        {...register("assignee")}
                        aria-invalid={Boolean(errors.assignee)}
                        className={inputClass(Boolean(errors.assignee))}
                    />
                </FormField>

                <FormField
                    label="Due date"
                    htmlFor="dueDate"
                    error={errors.dueDate?.message}
                    required
                >
                    <input
                        id="dueDate"
                        type="date"
                        {...register("dueDate")}
                        aria-invalid={Boolean(errors.dueDate)}
                        className={inputClass(Boolean(errors.dueDate))}
                    />
                    

                </FormField>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end dark:border-gray-800">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                    <ArrowLeft size={16}/>
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <Save size={16}/>
                    {isSubmitting ? (isEdit ? "Saving..." : "Creating...") : (isEdit ? "Save Changes" : "Create task")}
                </button>
            </div>
        </form>
    );
}

function FormField({
    label, htmlFor, error, required = false, children,
}){
    const errorId = `${htmlFor}-error`;
    return (
        <div>
            <label
                htmlFor={htmlFor}
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                {label}
                {required && (
                    <span aria-hidden="true" className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>
            {children}
            {error && (
                <p
                    id={errorId}
                    className="mt-1.5 text-sm text-red-600 dark:text-red-400"
                >
                    {error}
                </p>
            )}
        </div>
    );
}

function inputClass(hasError) {
    const base = "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-500";
    const errorState = "border-red-400 focus:border-red-500 focus:ring-red-500/20";
    const normalState = "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-gray-700";

    return `${base} ${hasError ? errorState : normalState}`;
}
