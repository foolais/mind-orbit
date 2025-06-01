"use client";

import { PriorityOptions, StatusOptions } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Task } from "@prisma/client";
import Badge from "../ui/badge";
import { FaRegClock } from "react-icons/fa6";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import DialogTask from "../dialog/dialog-task";

interface KanbanTaskProps {
  groupedTasks: Record<string, Task[]>;
}

const KanbanTask = ({ groupedTasks }: KanbanTaskProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (task: Task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };
  return (
    <>
      <Accordion
        type="multiple"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        defaultValue={StatusOptions.map((s) => s.value)}
      >
        {StatusOptions.map((status) => {
          const tasks = groupedTasks[status.value] || [];
          return (
            <AccordionItem
              key={status.value}
              value={status.value}
              className="pb-4 border rounded-md h-max"
            >
              <AccordionTrigger className="px-4 hover:no-underline flex items-center cursor-pointer">
                <div className="flex items-center gap-3 w-full">
                  <Badge option={status} />
                  <span className="ml-auto text-xs text-muted-foreground">
                    {tasks.length} Task{tasks.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2">
                {tasks.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="border border-l-4 py-2 px-4 rounded-md cursor-pointer hover:bg-muted"
                        style={{
                          borderLeftColor: StatusOptions.find(
                            (s) => s.value === task.status
                          )?.color,
                        }}
                        onClick={() => handleCardClick(task)}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm truncate">{task.title}</p>
                          <Badge
                            option={
                              PriorityOptions.find(
                                (p) => p.value === task.priority
                              ) || PriorityOptions[1]
                            }
                          />
                        </div>
                        <div className="border my-2 border-dashed" />
                        <p className="text-xs text-muted-foreground max-w-[400px] truncate">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <FaRegClock />
                          <span className="text-xs text-muted-foreground">
                            {formatDate(task.dueDate as Date)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 bg-white text-muted-foreground text-sm border rounded-md">
                    No tasks in this status
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
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
