import { StatusOptions } from "@/lib/data";
import { useDroppable } from "@dnd-kit/core";
import { Task } from "@prisma/client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Badge from "../ui/badge";
import TaskCard from "../card/task-card";

interface KanbanColumnProps {
  id: string;
  status: (typeof StatusOptions)[number];
  tasks: Task[];
  onCardClick: (task: Task) => void;
}

const KanbanColumn = ({
  id,
  status,
  tasks,
  onCardClick,
}: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      status: id,
    },
  });

  return (
    <AccordionItem
      value={status.value}
      className={`pb-4 border rounded-md h-max relative ${
        isOver ? "bg-muted/50" : ""
      }`}
      ref={setNodeRef}
    >
      <AccordionTrigger className="px-4 hover:no-underline flex items-center cursor-pointer">
        <div
          className={`flex items-center gap-3 w-full ${isOver ? "z-10" : ""}`}
        >
          <Badge option={status} />
          <span className="ml-auto text-xs text-muted-foreground">
            {tasks.length} Task{tasks.length !== 1 ? "s" : ""}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 py-2 overflow-visible">
        {tasks.length > 0 ? (
          <div className="flex flex-col gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => onCardClick(task)}
                statusColor={
                  StatusOptions.find((s) => s.value === task.status)?.color
                }
              />
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
};

export default KanbanColumn;
