import { create } from "zustand";

export type TFiltersStore = {
  searchTerm: string;
  sort: "Latest" | "Oldest";
  page: number;
  limit: number;
  populate: string;
  categories: string[];
  setPage: (page: number) => void;
  setCategories: (categories: string[]) => void;
};

export const useFiltersStore = create<TFiltersStore>((set) => ({
  page: 1,
  limit: 9,
  populate: "",
  categories: [],
  searchTerm: "",
  sort: "Latest",
  setPage: (page: number) => {
    set({ page });
  },
  setCategories: (categories: string[]) => {
    set({ categories });
  },
}));
