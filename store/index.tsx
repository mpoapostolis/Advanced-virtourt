import { Euler, Vector3 } from "three";
import { create } from "zustand";

export type ItemType = {
  id?: string;
  name?: string;
  position?: Vector3;
  rotation?: Euler;
  scale?: number;
  src?: string;
  thumbnail?: string;
};

export type Store = {
  item: ItemType | null;
  setItem: (item: Partial<ItemType> | null) => void;
};

export const useStore = create<Store>((set) => ({
  item: null,
  setItem: (item) =>
    set((state) => ({
      item: { ...state.item, ...item },
    })),
}));
