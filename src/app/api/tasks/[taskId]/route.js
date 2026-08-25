
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(
    process.cwd(),
    "src",
    "data",
    "tasks.json"
);

async function readTasks() {
    const file = await fs.readFile(filePath, "utf-8");
    return JSON.parse(file);
}

async function writeTasks(tasks) {
    await fs.writeFile(
        filePath,
        JSON.stringify(tasks, null, 2),
        "utf-8"
    );
}

// GET /api/tasks/[taskId]
export async function GET(request, { params }) {
    try {
        const { taskId } = await params;
        const tasks = await readTasks();
        const task = tasks.find((item) => String(item.id) === String(taskId));

        if (!task) {
            return NextResponse.json(
                { success: false, message: "Task not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: task });
    } catch (error) {
        console.error("GET SINGLE TASK ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Failed to load task." },
            { status: 500 }
        );
    }
}

// PATCH /api/tasks/[taskId]
export async function PATCH(request, { params }) {
    try {
        const { taskId } = await params;
        const tasks = await readTasks();

        const taskIndex = tasks.findIndex(
            (item) => String(item.id).trim() === String(taskId).trim()
        );

        if (taskIndex === -1) {
            return NextResponse.json(
                { success: false, message: `Task not found (ID: ${taskId})` },
                { status: 404 }
            );
        }

        const body = await request.json();
        const actualEdits = body.taskData ? body.taskData : body;

        const updatedTask = {
            ...tasks[taskIndex],
            ...actualEdits,
        };

        tasks[taskIndex] = updatedTask;
        await writeTasks(tasks);

        return NextResponse.json({
            success: true,
            data: updatedTask,
            message: "Task updated successfully.",
        });
    } catch (error) {
        console.error("PATCH TASK EXCEPTION ERROR:", error);
        return NextResponse.json(
            { success: false, message: error?.message || "Failed to update task." },
            { status: 500 }
        );
    }
}

// DELETE /api/tasks/[taskId]
export async function DELETE(request, { params }) {
    try {
        const { taskId } = await params;
        const tasks = await readTasks();

        const taskIndex = tasks.findIndex((item) => String(item.id) === String(taskId));

        if (taskIndex === -1) {
            return NextResponse.json(
                { success: false, message: "Task not found" },
                { status: 404 }
            );
        }

        const deletedTask = tasks.splice(taskIndex, 1)[0];
        await writeTasks(tasks);

        return NextResponse.json({
            success: true,
            data: deletedTask,
            message: "Task deleted successfully.",
        });
    } catch (error) {
        console.error("DELETE TASK ERROR:", error);
        return NextResponse.json(
            { success: false, message: error?.message || "Failed to delete task." },
            { status: 500 }
        );
    }
}
