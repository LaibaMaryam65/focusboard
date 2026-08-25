import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import TaskDetailClient from "./TaskDetailClient";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
  }),
}));

vi.mock("@/hooks/useTasks", () => ({
  useTask: () => ({
    data: {
      id: "t1",
      title: "Finish FocusBoard",
      description: "Complete the frontend assignment",
      status: "in-progress",
      priority: "high",
      assignee: "Laiba",
      dueDate: "2026-08-30",
      projectId: "p1",
      projectName: "FocusBoard",
    },

    isLoading: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
  }),

  useDeleteTask: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Task data flow", () => {
  it("renders task information returned by the query", () => {
    render(<TaskDetailClient taskId="t1" />);

    expect(
      screen.getByText("Finish FocusBoard")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Complete the frontend assignment")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Laiba")
    ).toBeInTheDocument();

 expect(
  screen.getAllByText("In Progress")
).toHaveLength(2);

    expect(
      screen.getByText("High")
    ).toBeInTheDocument();
  });
});