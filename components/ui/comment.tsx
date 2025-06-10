"use client";

import { commentSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { FaRegPaperPlane } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "./avatar";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import DeleteButton from "../button/delete-button";

const Comment = () => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const handleOnSubmit = (data: z.infer<typeof commentSchema>) => {
    console.log({ data });
  };
  return (
    <div>
      <div className="h-[400px] overflow-y-scroll p-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Avatar>
                <Image
                  src={session?.user.image || ""}
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />

                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <div className="w-full flex items-center gap-2 ">
                <p className="text-sm font-semibold text-gray-900 capitalize">
                  {session?.user?.name}
                </p>
                <DeleteButton onDelete={() => {}} text="Comment" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground capitalize">
                {formatDate(new Date())}
              </p>
            </div>
            <p className="text-sm text-muted-foreground bg-slate-100 p-2 rounded-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              ipsum illum rerum eius accusamus quis, necessitatibus quidem
              officia similique amet?
            </p>
          </div>
        ))}
      </div>
      <div className="w-full flex gap-2">
        <Avatar>
          <Image
            src={session?.user.image || ""}
            alt="Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />

          <AvatarFallback>M</AvatarFallback>
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
                    <Textarea placeholder="Add a comment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <FaRegPaperPlane />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Comment;
