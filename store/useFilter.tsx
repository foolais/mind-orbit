import { TaskPriority, TaskStatus } from "@prisma/client";
import { create } from "zustand";

interface Filter {
  project: string;
  type: "TABLE" | "KANBAN";
  priority: "ALL" | TaskPriority;
  status: "ALL" | TaskStatus;
}

interface FilterStore {
  filter: Filter;
  setFilter: (filter: Partial<Filter>) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filter: {
    project: "",
    type: "TABLE",
    priority: "ALL",
    status: "ALL",
  },
  setFilter: (filter) =>
    set((state) => ({ filter: { ...state.filter, ...filter } })),
}));
