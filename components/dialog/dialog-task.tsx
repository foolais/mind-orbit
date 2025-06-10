"use client";

import { useEffect, useTransition } from "react";
import { Button } from "../ui/button";
import { FaCalendar, FaSpinner } from "react-icons/fa6";
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
import { createTask, deleteTask, updateTask } from "@/lib/action/action-task";
import Badge from "../ui/badge";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn, formatDate } from "@/lib/utils";
import { useFilter } from "@/store/useFilter";
import { Task } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Comment from "../ui/comment";

interface DialogTaskProps {
  task?: Task;
  isOpen: boolean;
  onClose: () => void;
  type: "CREATE" | "UPDATE";
}

const DialogTask = ({
  task,
  isOpen,
  onClose,
  type = "CREATE",
}: DialogTaskProps) => {
  const [isPending, startTransition] = useTransition();
  const { filter } = useFilter();

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "BACKLOG",
      priority: "LOW",
      dueDate: new Date(),
    },
  });

  const handleOnSubmit = (data: z.infer<typeof taskSchema>) => {
    try {
      startTransition(async () => {
        if (type === "CREATE") await createTask(data, filter.project);
        if (type === "UPDATE" && task) await updateTask(data, task?.id);
        onClose();
        form.reset();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async () => {
    await deleteTask(task?.id ?? "");
    onClose();
  };

  useEffect(() => {
    if (task && type === "UPDATE") {
      form.reset({
        title: task.title,
        description: task.description ?? "",
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
      });
    } else {
      form.reset();
    }
  }, [task, form, type]);

  return (
    <DialogForm
      isOpen={isOpen}
      onClose={onClose}
      title={type === "CREATE" ? "Create Task" : "Detail Task"}
      description={
        type === "CREATE"
          ? "Create a new task and assign it to a project."
          : `Task created on ${formatDate(task?.createdAt ?? new Date())}`
      }
      canDelete
      onDelete={handleDeleteTask}
      text={`Task: ${task?.title ?? ""}`}
      className="min-h-[635px] max-h-[635px] overflow-y-auto"
    >
      <Tabs defaultValue="detail">
        <TabsList className="w-full">
          <TabsTrigger value="detail">Detail</TabsTrigger>
          <TabsTrigger value="comment">Comment</TabsTrigger>
        </TabsList>
        <TabsContent value="detail">
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
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <FaCalendar className="h-4 w-4 opacity-50" />
                            {field.value ? (
                              formatDate(new Date(field.value))
                            ) : (
                              <span>Select due date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("2000-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="flex ml-auto cursor-pointer"
                disabled={isPending}
              >
                {getButtonText(type, isPending)}
                {isPending && (
                  <FaSpinner className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="comment" className="p-0">
          <Comment />
        </TabsContent>
      </Tabs>
    </DialogForm>
  );
};

const getButtonText = (type: "CREATE" | "UPDATE", isPending: boolean) => {
  if (isPending) {
    return type === "CREATE" ? "Creating..." : "Updating...";
  }
  return type === "CREATE" ? "Create Task" : "Save Changes";
};

export default DialogTask;
