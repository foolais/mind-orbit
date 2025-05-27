import { TaskPriority } from "@prisma/client";
import { create } from "zustand";

interface Filter {
  project: string;
  search: string;
  priority: "ALL" | TaskPriority;
}

interface FilterStore {
  filter: Filter;
  setFilter: (filter: Partial<Filter>) => void;
}

export const useFilter = create<FilterStore>((set) => ({
  filter: {
    project: "",
    search: "",
    priority: "ALL",
  },
  setFilter: (filter) =>
    set((state) => ({ filter: { ...state.filter, ...filter } })),
}));
