import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters" })
    .max(20, { message: "Name must be at most 20 characters" }),
  description: z.string().optional(),
});
