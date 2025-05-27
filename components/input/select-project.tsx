"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DialogCreateProject from "../dialog/dialog-create-project";
import { useEffect, useState, useTransition } from "react";
import { getProjectsByUserId } from "@/lib/action/action-project";
import { FaSpinner } from "react-icons/fa6";
import { useFilter } from "@/store/useFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SelectProject = () => {
  const [projectsData, setProjectsData] = useState<
    { value: string; label: string }[]
  >([]);
  const [isPending, startTransition] = useTransition();
  const { filter, setFilter } = useFilter();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getProjectsByUserId();
        const projects = Array.isArray(result)
          ? result.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            })
          : [];
        setProjectsData(projects);
      } catch (error) {
        setProjectsData([]);
        console.log(error);
      }
    };

    startTransition(fetchProjects);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (filter.project === "") {
        params.delete("project");
      } else {
        params.set("project", filter.project);
      }

      const newUrl = `${pathname}?${params.toString()}`;
      if (newUrl !== `${pathname}?${searchParams.toString()}`) {
        router.push(newUrl, { scroll: false });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [filter.project, pathname, router, searchParams]);

  useEffect(() => {
    const projectParam = searchParams.get("project");
    if (projectParam) {
      setFilter({ project: projectParam });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select
      value={filter.project}
      onValueChange={(value) => setFilter({ project: value })}
    >
      <SelectTrigger className="min-w-[200px] cursor-pointer ml-4">
        {isPending ? (
          <div className="flex items-center gap-2">
            <FaSpinner className="h-4 w-4 animate-spin" />
            <span>Loading projects...</span>
          </div>
        ) : (
          <SelectValue placeholder="Select a Project" />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>List Projects</SelectLabel>
          {projectsData.length === 0 && <p>Empty projects</p>}
          {projectsData ? (
            projectsData.map((project) => (
              <SelectItem
                key={project.value}
                value={project.value}
                className="cursor-pointer"
              >
                <span className="size-3.5 bg-primary rounded-full" />
                {project.label}
              </SelectItem>
            ))
          ) : (
            <p>Empty projects</p>
          )}

          <DialogCreateProject />
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectProject;
