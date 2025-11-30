import { StateCreator } from "zustand";

import { RootStore } from "./root";

export type GlobalSlice = {
  sidebar: boolean;
  toggleSidebar: () => void;
};

export const createGlobalSlice: StateCreator<
  RootStore,
  [["zustand/subscribeWithSelector", never], ["zustand/devtools", never]],
  [],
  GlobalSlice
> = (set, get) => ({
  sidebar: false,
  toggleSidebar: () => set({ sidebar: !get().sidebar }),
});
