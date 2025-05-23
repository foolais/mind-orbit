"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

interface CreateProjectData {
  name: string;
  description?: string;
}

export const createProject = async (data: CreateProjectData) => {
  const session = await auth();
  const ownerId = session?.user?.id;

  if (!session || !ownerId) {
    return { error: true, message: "Unauthorized" };
  }

  const { name, description } = data;

  try {
    await prisma.$transaction(async (prisma) => {
      // Create the project
      const project = await prisma.project.create({
        data: {
          name,
          description,
          ownerId,
        },
      });

      // Create the project member relationship
      await prisma.projectMember.create({
        data: {
          userId: ownerId,
          projectId: project.id,
          role: "OWNER",
        },
      });

      return project;
    });

    revalidatePath("/");
    return { succes: true, message: "Project created successfully" };
  } catch (error) {
    console.error("Error creating project:", error);
    return { error: true, message: "Unauthorized" };
  }
};
