"use client";

import { PriorityOptions } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import Badge from "../ui/badge";
import { Task } from "@prisma/client";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({
  task,
  onClick,
  statusColor,
}: {
  task: Task;
  onClick: () => void;
  statusColor?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [originalWidth, setOriginalWidth] = useState("100%");
  const [originalPosition, setOriginalPosition] = useState({
    x: 0,
    y: 0,
  });

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: {
        type: "TASK",
        task,
      },
    });

  useEffect(() => {
    if (cardRef.current) {
      setOriginalWidth(`${cardRef.current.offsetWidth}px`);
      const rect = cardRef.current.getBoundingClientRect();
      setOriginalPosition({
        x: rect.left,
        y: rect.top,
      });
    }
  }, []);

  const style = {
    transform: CSS.Translate.toString(transform),
    boxShadow: isDragging ? "0 10px 15px -3px rgba(0, 0, 0, 0.2)" : "none",
    zIndex: isDragging ? 100 : "auto",
    position: isDragging ? ("fixed" as const) : ("relative" as const),
    width: isDragging ? originalWidth : "100%",
    top: isDragging ? `${originalPosition.y}px` : undefined,
    left: isDragging ? `${originalPosition.x}px` : undefined,
    transition: isDragging ? "none" : "transform 0.2s ease",
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (node) cardRef.current = node;
      }}
      className={`border border-l-4 py-2 px-4 rounded-md bg-white hover:bg-muted ${
        isDragging ? "ring-2 ring-primary/50 shadow-lg" : ""
      }`}
      style={{
        ...style,
        borderLeftColor: statusColor,
      }}
    >
      <div
        {...attributes}
        {...listeners}
        className="p-1 cursor-grab hover:bg-gray-100"
      >
        <div className="h-1 w-6 bg-gray-300 rounded-full m-auto" />
      </div>
      <div onClick={onClick} className="cursor-pointer pb-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm truncate">{task.title}</p>
          <Badge
            option={
              PriorityOptions.find((p) => p.value === task.priority) ||
              PriorityOptions[1]
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
    </div>
  );
};

export default TaskCard;
