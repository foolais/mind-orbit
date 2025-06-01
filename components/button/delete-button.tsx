"use client";

import { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { FaRegTrashCan, FaSpinner } from "react-icons/fa6";

interface DeleteButtonProps {
  text: string;
  onDelete: () => void;
}

const DeleteButton = ({ text, onDelete }: DeleteButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(onDelete);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="cursor-pointer border border-red-500 text-red-500 rounded-full p-1 hover:bg-red-500 hover:text-white">
          <FaRegTrashCan size={15} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent aria-description="delete" aria-describedby="delete">
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete this?</AlertDialogTitle>
          <AlertDialogDescription>{text}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/70"
          >
            {isPending ? "Deleting..." : "Yes"}
            {isPending && <FaSpinner className="ml-2 h-4 w-4 animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
