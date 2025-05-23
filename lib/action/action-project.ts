"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";

export const getProjectByUserId = async (searchQuery: string) => {
  const session = await auth();
  if (!session) return { error: { auth: ["You must be logged in"] } };

  const userId = session?.user?.id;

  const [ownedProjects, memberProjects] = await prisma.$transaction([
    prisma.project.findMany({
      where: {
        ownerId: userId,
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      include: {
        members: true,
        tasks: true,
      },
    }),
    prisma.projectMember.findMany({
      where: {
        userId,
        project: {
          name: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
      },
      include: {
        project: {
          include: {
            members: true,
            tasks: true,
          },
        },
      },
    }),
  ]);

  const projectsAsMember = memberProjects.map((m) => m.project);

  const allProjects = [
    ...ownedProjects,
    ...projectsAsMember.filter(
      (proj) => !ownedProjects.some((p) => p.id === proj.id)
    ),
  ];

  return allProjects;
};

interface CreateProjectData {
  name: string;
  description?: string;
}

export const createProject = async (data: CreateProjectData) => {
  const session = await auth();
  const ownerId = session?.user?.id;
  if (!session || !ownerId)
    return { error: { auth: ["You must be logged in"] } };

  const { name, description } = data;

  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        ownerId,
        members: {
          create: [
            {
              userId: ownerId,
              role: "OWNER",
            },
          ],
        },
      },
    });

    return project;
  } catch (error) {
    console.log({ error });
    return { error };
  }
};
