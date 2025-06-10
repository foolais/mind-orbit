"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

interface CreateComment {
  content: string;
  taskId: string;
}

export const getCommentsByTask = async (taskId: string) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session || !userId) {
    return { error: true, message: "Unauthorized" };
  } else if (!taskId) {
    return { error: true, message: "Select a task first" };
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { taskId },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    revalidatePath("/task");
    return comments;
  } catch (error) {
    return { error: true, message: error };
  }
};

export const createComment = async (data: CreateComment) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session || !userId) {
    return { error: true, message: "Unauthorized" };
  } else if (!data.taskId) {
    return { error: true, message: "Select a task first" };
  }

  try {
    const result = await prisma.comment.create({
      data: {
        content: data.content,
        taskId: data.taskId,
        authorId: userId,
      },
    });
    return result;
  } catch (error) {
    return { error: true, message: error };
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return { success: true, message: "Comment deleted" };
  } catch (error) {
    return { error: true, message: error };
  }
};
