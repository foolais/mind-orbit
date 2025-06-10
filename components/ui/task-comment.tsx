"use client";

import { commentSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { FaRegPaperPlane, FaSpinner } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "./avatar";
import Image from "next/image";
import DeleteButton from "../button/delete-button";
import { useEffect, useState, useTransition } from "react";
import {
  createComment,
  deleteComment,
  getCommentsByTask,
} from "@/lib/action/action-comment";
import { Comment } from "@prisma/client";
import moment from "moment";

interface CommentProps {
  taskId: string | undefined;
}

interface Author {
  id: string;
  name: string | null;
  image: string | null;
}

interface CommentWithAuthor extends Comment {
  author: Author;
}

const TaskComment = ({ taskId }: CommentProps) => {
  const { data: session } = useSession();

  const [data, setData] = useState<CommentWithAuthor[]>([]);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const fetchComments = async () => {
    try {
      const comments = await getCommentsByTask(taskId || "");

      if (Array.isArray(comments)) {
        setData(comments);
        form.reset({ comment: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmit = (data: z.infer<typeof commentSchema>) => {
    const payload = {
      content: data.comment,
      taskId: taskId || "",
    };
    try {
      startTransition(async () => {
        const res = await createComment(payload);
        if ("id" in res) await fetchComments();
        form.reset();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = (commentId: string) => {
    try {
      startTransition(async () => {
        const res = await deleteComment(commentId);
        if (res.success) await fetchComments();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchComments();
      form.reset({ comment: "" });
    };

    startTransition(fetchData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId, form]);

  return (
    <div>
      <div className="h-[380px] overflow-y-scroll p-2">
        {isPending ? (
          <div className="flex items-center justify-center mt-20">
            <FaSpinner className="text-primary size-8 animate-spin" />
          </div>
        ) : (
          <>
            {data && data.length > 0 ? (
              data.map((comment) => (
                <div key={comment.id} className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar>
                      <Image
                        src={comment?.author?.image || ""}
                        alt="Avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />

                      <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                    <div className="w-full flex items-center gap-4">
                      <p className="text-sm text-gray-900 capitalize">
                        {comment?.authorId === session?.user.id
                          ? "You"
                          : comment?.author?.name}
                      </p>
                      {comment?.authorId === session?.user.id && (
                        <DeleteButton
                          onDelete={() => {
                            handleDeleteComment(comment.id);
                          }}
                          text=""
                        />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground capitalize text-center">
                      {moment(comment.createdAt).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <div className="w-max max-w-[300px] md:max-w-[450px]">
                    <div className="relative text-sm bg-slate-200 p-2 rounded-md w-full min-w-[3rem] min-h-[2.5rem] before:content-[''] before:absolute before:top-0 before:left-2 before:border-8 before:border-transparent before:border-b-slate-200 before:-translate-y-full break-words whitespace-pre-wrap pb-6">
                      <span>{comment.content}</span>
                      <span className="text-xs text-muted-foreground absolute bottom-2 right-2">
                        {moment(comment.createdAt).format("HH:mm")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center mt-20">
                <p className="text-sm text-muted-foreground">No comments yet</p>
              </div>
            )}
          </>
        )}
      </div>
      <div className="w-full flex gap-2 pt-4 border-t">
        <Avatar>
          <Image
            src={session?.user.image || ""}
            alt="Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />

          <AvatarFallback>MO</AvatarFallback>
        </Avatar>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="flex gap-2 w-full"
          >
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      placeholder="Add a comment"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <FaSpinner className="size-4 animate-spin" />
              ) : (
                <FaRegPaperPlane />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TaskComment;
