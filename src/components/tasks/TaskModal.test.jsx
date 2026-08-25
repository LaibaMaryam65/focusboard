import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import TaskModal from "./TaskModal";

const mockBack = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("@/hooks/useTasks", () => ({
  useTask: () => ({
    data: {
      id: "t1",
      title: "Test Task",
      description: "Test description",
      status: "todo",
      priority: "medium",
      assignee: "Laiba",
      dueDate: "2026-08-30",
      projectName: "FocusBoard",
    },
    isLoading: false,
    isError: false,
    error: null,
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

describe("TaskModal", () => {
  beforeEach(() => {
    mockBack.mockClear();
  });

  it("closes the modal when the close button is clicked", () => {
    render(<TaskModal taskId="t1" />);

    const closeButton = screen.getByRole("button", {
      name: /close task details/i,
    });

    fireEvent.click(closeButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});