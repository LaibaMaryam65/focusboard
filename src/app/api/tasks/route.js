
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


// GET /api/tasks
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const projectId =
            searchParams.get("projectId");

        const tasks = await readTasks();

        let filteredTasks = tasks;

        if (projectId) {
            filteredTasks = tasks.filter(
                (task) =>
                    String(task.projectId) ===
                    String(projectId)
            );
        }

        return NextResponse.json({
            success: true,
            data: filteredTasks,
        });

    } catch (error) {
        console.error("GET TASKS ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to load tasks.",
            },
            { status: 500 }
        );
    }
}


// POST /api/tasks
export async function POST(request) {
    try {
        const body = await request.json();

     

        const {
            projectId,
            title,
            description,
            status,
            priority,
            assignee,
            dueDate,
        } = body;

        if (
            !projectId ||
            !title ||
            !description ||
            !status ||
            !priority ||
            !assignee ||
            !dueDate
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "All task fields are required",
                },
                { status: 400 }
            );
        }

        // READ CURRENT JSON DATA
        const tasks = await readTasks();

        const newTask = {
            id: `t${Date.now()}`,
            projectId,
            title,
            description,
            status,
            priority,
            assignee,
            dueDate,
            createdAt: new Date()
                .toISOString()
                .split("T")[0],
        };

        // ADD TASK
        tasks.push(newTask);

        // SAVE TASK TO JSON
        await writeTasks(tasks);

     

        return NextResponse.json(
            {
                success: true,
                data: newTask,
                message:
                    "Task created successfully.",
            },
            { status: 201 }
        );

    } catch (error) {
        console.error(
            "POST TASK ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    error?.message ||
                    "Failed to create task.",
            },
            { status: 500 }
        );
    }
}