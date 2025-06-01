"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { PriorityOptions, StatusOptions } from "@/lib/data";
import Badge from "../ui/badge";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { formatDate } from "@/lib/utils";
import { Task } from "@prisma/client";
import { useState } from "react";
import DialogTask from "../dialog/dialog-task";

interface TableTaskProps {
  groupedTasks: Record<string, Task[]>;
}

const TableTask = ({ groupedTasks }: TableTaskProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRowClick = (task: Task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Accordion type="multiple" className="w-full" defaultValue={["TODO"]}>
        {StatusOptions.map((status) => {
          const tasks = groupedTasks[status.value] || [];
          return (
            <AccordionItem
              key={status.value}
              value={status.value}
              className="pb-4"
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
                  <Table>
                    <TableBody>
                      {tasks.map((task) => (
                        <TableRow
                          key={task.id}
                          className="cursor-pointer hover:bg-muted"
                          onClick={() => handleRowClick(task)}
                        >
                          <TableCell className="font-medium max-w-[200px] truncate md:w-[40%]">
                            {task.title}
                          </TableCell>
                          <TableCell className="hidden md:table-cell max-w-[200px]  md:w-1/3 truncate">
                            {task.description}
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-medium">
                            {formatDate(task.dueDate as Date)}
                          </TableCell>
                          <TableCell className="text-right w-[100px]">
                            <Badge
                              option={
                                PriorityOptions.find(
                                  (p) => p.value === task.priority
                                ) || PriorityOptions[1]
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-4 text-muted-foreground text-sm border rounded-md">
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

export default TableTask;
