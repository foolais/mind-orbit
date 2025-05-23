"use client";

import { useState, useTransition } from "react";
import DialogForm from "./dialog-form";
import { Button } from "../ui/button";
import { FaPlus, FaSpinner } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { createProjectSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createProject } from "@/lib/action/action-project";

export const DialogCreateProject = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleOnSubmit = (data: z.infer<typeof createProjectSchema>) => {
    try {
      startTransition(async () => {
        const res = await createProject(data);
        console.log({ res });
        setIsOpen(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full cursor-pointer bg-primary hover:bg-primary/80 text-white hover:text-white my-2"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus />
        Create A New Project
      </Button>
      <DialogForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create A New Project"
        description="Fill out the form below to create a new project."
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a name"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a description"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="flex ml-auto cursor-pointer"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create"}
              {isPending && <FaSpinner className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </form>
        </Form>
      </DialogForm>
    </>
  );
};

export default DialogCreateProject;
