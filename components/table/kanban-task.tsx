"use client";

import { StatusOptions } from "@/lib/data";
import { Accordion } from "../ui/accordion";
import { Task, TaskStatus } from "@prisma/client";
import { useState, useTransition } from "react";
import DialogTask from "../dialog/dialog-task";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { updateStatusTask } from "@/lib/action/action-task";
import { FaSpinner } from "react-icons/fa6";
import KanbanColumn from "./kanban-column";

interface KanbanTaskProps {
  groupedTasks: Record<string, Task[]>;
}

const KanbanTask = ({ groupedTasks }: KanbanTaskProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, startTransition] = useTransition();

  const handleCardClick = (task: Task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.data.current?.type === "TASK" && over?.data.current?.status) {
      const newStatus = over.data.current.status as TaskStatus;
      const currentStatus = active.data.current.task.status as TaskStatus;
      const taskId = active.data.current.task.id;
      startTransition(async () => {
        if (newStatus === currentStatus) return;
        await updateStatusTask(taskId, newStatus);
      });
    }
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <Accordion
          type="multiple"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
          defaultValue={StatusOptions.map((s) => s.value)}
        >
          {isUpdating && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
              <FaSpinner className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}
          {StatusOptions.map((status) => {
            const tasks = groupedTasks[status.value] || [];
            return (
              <KanbanColumn
                key={status.value}
                id={status.value}
                status={status}
                tasks={tasks}
                onCardClick={handleCardClick}
              />
            );
          })}
        </Accordion>
      </DndContext>
      {selectedTask && (
        <DialogTask
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          type="UPDATE"
          task={selectedTask}
        />
      )}
    </>
  );
};

export default KanbanTask;
