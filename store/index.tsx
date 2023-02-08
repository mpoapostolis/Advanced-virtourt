import { ItemType } from "@/lib/items/types";
import { create } from "zustand";

export type Store = {
  item: Partial<ItemType> | null;
  setItem: (item: Partial<ItemType> | null) => void;
};

export const useStore = create<Store>((set) => ({
  item: null,
  setItem: (item) => {
    set((state) => ({
      item: { ...state.item, ...item },
    }));
  },
}));
