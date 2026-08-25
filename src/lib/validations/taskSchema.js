

import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .max(100, "Title is too long"),
    
  description: z
    .string()
    .min(1, "Description is required"),
    
  status: z.enum(["todo", "in-progress", "completed"]).default("todo"),
  
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  
  assignee: z
    .string()
    .min(1, "Assignee name is required"),
 
  dueDate: z
    .string()
    .min(1, "Due date is required"),
  projectId: z.string().optional(),
});
