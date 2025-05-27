import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters" })
    .max(20, { message: "Name must be at most 20 characters" }),
  description: z.string().optional(),
});

export const taskSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be at least 4 characters" })
    .max(20, { message: "Title must be at most 20 characters" }),
  description: z.string().optional(),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
  status: z.enum(["BACKLOG", "TODO", "INPROGRESS", "DONE"]),
});
