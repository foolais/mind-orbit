"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { logoutCredentials } from "@/lib/action/action-auth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaArrowRightFromBracket, FaSpinner } from "react-icons/fa6";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutCredentials();
      router.push("/auth");
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex justify-start has-[>svg]:px-2"
        >
          <FaArrowRightFromBracket size={5} color="red" />
          Logout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent aria-description="logout" aria-describedby="logout">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to logout?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/70"
          >
            {isPending ? "Logging out..." : "Yes"}
            {isPending && <FaSpinner className="ml-2 h-4 w-4 animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;
