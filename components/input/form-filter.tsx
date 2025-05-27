"use client";

import { filterSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PriorityOptions } from "@/lib/data";
import Badge from "../ui/badge";
import { Button } from "../ui/button";
import { FaMagnifyingGlass, FaSpinner } from "react-icons/fa6";
import { useTransition } from "react";
import { useFilter } from "@/store/useFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FormFilter = () => {
  const { setFilter } = useFilter();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: searchParams.get("search") || "",
      priority:
        searchParams.get("priority") !== null || undefined
          ? (searchParams.get("priority")?.toUpperCase() as
              | "ALL"
              | "HIGH"
              | "MEDIUM"
              | "LOW")
          : "ALL",
    },
  });

  const handleOnSubmit = (data: z.infer<typeof filterSchema>) => {
    startTransition(() => {
      setFilter({ search: data.search, priority: data.priority });

      const paramUpdates = {
        search: data.search || undefined,
        priority: data.priority !== "ALL" ? data.priority : undefined,
      };

      const params = new URLSearchParams(searchParams);

      Object.entries(paramUpdates).forEach(([key, value]) => {
        if (value !== undefined) {
          params.set(key, value.toLocaleLowerCase());
        } else {
          params.delete(key);
        }
      });

      const newUrl = `${pathname}?${params.toString()}`;
      if (newUrl !== `${pathname}?${searchParams.toString()}`) {
        router.push(newUrl, { scroll: false });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex gap-2 md:gap-4 md:max-w-3xl"
        onSubmit={form.handleSubmit(handleOnSubmit)}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => <Input placeholder="Search..." {...field} />}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="cursor-pointer w-[140px]">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ALL" className="cursor-pointer">
                    <Badge
                      option={{
                        value: "ALL",
                        label: "ALL",
                        color: "#64748B",
                        bgColor: "bg-slate-50",
                        textColor: "text-slate-700",
                      }}
                    />
                  </SelectItem>
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
        <Button type="submit" className="cursor-pointer" disabled={isPending}>
          <span className="hidden sm:inline">Search</span>
          {!isPending ? (
            <FaMagnifyingGlass />
          ) : (
            <FaSpinner className="ml-2 h-4 w-4 animate-spin" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormFilter;
