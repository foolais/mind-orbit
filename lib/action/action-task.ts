"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { Prisma, TaskPriority, TaskStatus } from "@prisma/client";

interface CreateTask {
  title: string;
  description?: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "BACKLOG" | "TODO" | "INPROGRESS" | "DONE";
  dueDate: Date;
}

export const getTasksByProjectId = async (
  projectId: string,
  search?: string,
  priority?: TaskPriority | "ALL"
) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session || !userId) {
    return { error: true, message: "Unauthorized" };
  } else if (!projectId) {
    return { error: true, message: "Select a project first" };
  }

  const where: Prisma.TaskWhereInput = {
    projectId,
  };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (priority?.toUpperCase() !== "ALL") {
    where.priority = priority?.toUpperCase() as TaskPriority;
  }

  try {
    const tasks = await prisma.task.findMany({ where });
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
    return { error: true, message: "Select a task first" };
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

export const updateStatusTask = async (taskId: string, status: TaskStatus) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session || !userId) {
    return { error: true, message: "Unauthorized" };
  } else if (!taskId) {
    return { error: true, message: "Select a task first" };
  }

  try {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status,
      },
    });
    revalidatePath("/task");
  } catch (error) {
    return { error: true, message: error };
  }
};

export const deleteTask = async (taskId: string) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session || !userId) {
    return { error: true, message: "Unauthorized" };
  } else if (!taskId) {
    return { error: true, message: "Select a task first" };
  }

  try {
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    revalidatePath("/task");
  } catch (error) {
    return { error: true, message: error };
  }
};
