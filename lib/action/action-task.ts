"use server";

interface CreateTask {
  title: string;
  description?: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "BACKLOG" | "TODO" | "INPROGRESS" | "DONE";
}

export const createTask = async (data: CreateTask) => {
  console.log(data);
};
