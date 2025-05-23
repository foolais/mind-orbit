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

export const SelectProject = () => {
  return (
    <Select>
      <SelectTrigger className="min-w-[200px] cursor-pointer ml-4">
        <SelectValue placeholder="Select a Project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Projects</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
          <DialogCreateProject />
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectProject;
