"use client";

import { FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useState } from "react";
import DialogTask from "../dialog/dialog-task";

export const CreateTaskButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <FaPlus className="size-4" />
        New Task
      </Button>
      <DialogTask
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type="CREATE"
      />
    </>
  );
};
