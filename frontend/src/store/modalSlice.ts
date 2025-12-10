import { StateCreator } from "zustand";

import { RootStore } from "./root";

export type ModalSlice = {
  tokenSelectModal: boolean;
  openTokenSelectModal: () => void;
  closeTokenSelectModal: () => void;
};

export const createModalSlice: StateCreator<
  RootStore,
  [["zustand/subscribeWithSelector", never], ["zustand/devtools", never]],
  [],
  ModalSlice
> = (set) => ({
  tokenSelectModal: false,
  openTokenSelectModal: () => set({ tokenSelectModal: true }),
  closeTokenSelectModal: () => set({ tokenSelectModal: false }),
});
