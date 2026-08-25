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
    data: null,
    isLoading: false,
    isError: true,
    error: {
      message: "Failed to load task",
    },
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

describe("TaskDetailClient error state", () => {
  it("shows an error message when task loading fails", () => {
    render(<TaskDetailClient taskId="t1" />);

    expect(
      screen.getByRole("alert")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Unable to load task")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Failed to load task")
    ).toBeInTheDocument();
  });
});