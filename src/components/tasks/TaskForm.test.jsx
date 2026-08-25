import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import TaskForm from "./TaskForm";

describe("TaskForm validation", () => {
  it("shows validation errors when required fields are empty", async () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();

    render(
      <TaskForm
        mode="create"
        initialData={{
          title: "",
          description: "",
          status: "todo",
          priority: "medium",
          assignee: "",
          dueDate: "",
        }}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isSubmitting={false}
      />
    );

    const submitButton = screen.getByRole("button", {
      name: /create task/i,
    });

    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/title.*required/i)
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });
});