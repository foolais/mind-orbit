"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

interface CreateTask {
  title: string;
  description?: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "BACKLOG" | "TODO" | "INPROGRESS" | "DONE";
  dueDate: Date;
}

export const getTasksByProjectId = async (projectId: string) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session || !userId) {
    return { error: true, message: "Unauthorized" };
  } else if (!projectId) {
    return { error: true, message: "Select a project first" };
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId,
      },
    });
    return tasks;
  } catch (error) {
    return { error: true, message: error };
  }
};

export const createTask = async (data: CreateTask, projectId: string) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session || !userId) {
    return { error: true, message: "Unauthorized" };
  } else if (!projectId) {
    return { error: true, message: "Select a project first" };
  }

  const { title, description, priority, status, dueDate } = data;

  try {
    await prisma.task.create({
      data: {
        title,
        description,
        priority,
        status,
        dueDate,
        projectId,
      },
    });
    revalidatePath("/task");
  } catch (error) {
    return { error: true, message: error };
  }
};

export const updateTask = async (data: CreateTask, taskId: string) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session || !userId) {
    return { error: true, message: "Unauthorized" };
  } else if (!taskId) {
    return { error: true, message: "Select a project first" };
  }

  const { title, description, priority, status, dueDate } = data;

  try {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
        priority,
        status,
        dueDate,
      },
    });
    revalidatePath("/task");
  } catch (error) {
    return { error: true, message: error };
  }
};
