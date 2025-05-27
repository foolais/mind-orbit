"use client";

import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { FaPlus, FaSpinner } from "react-icons/fa6";
import DialogForm from "./dialog-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { taskSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PriorityOptions, StatusOptions } from "@/lib/data";
import { createTask } from "@/lib/action/action-task";
import Badge from "../ui/badge";

const DialogTask = ({ type = "CREATE" }: { type: "CREATE" | "UPDATe" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "BACKLOG",
      priority: "LOW",
    },
  });

  const handleOnSubmit = (data: z.infer<typeof taskSchema>) => {
    try {
      startTransition(async () => {
        if (type === "CREATE") await createTask(data);
        setIsOpen(false);
        form.reset();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <FaPlus className="size-4" />
        New Task
      </Button>
      <DialogForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create A New Task"
        description="Fill out the form below to create a new task."
      >
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleOnSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a title"
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
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PriorityOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="cursor-pointer"
                        >
                          <Badge option={option} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {StatusOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="cursor-pointer"
                        >
                          <Badge option={option} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default DialogTask;
