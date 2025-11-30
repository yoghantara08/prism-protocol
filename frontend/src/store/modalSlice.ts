import { StateCreator } from "zustand";

import { RootStore } from "./root";

export type ModalSlice = {
  txModal: boolean;
  openTxModal: () => void;
  closeTxModal: () => void;
};

export const createModalSlice: StateCreator<
  RootStore,
  [["zustand/subscribeWithSelector", never], ["zustand/devtools", never]],
  [],
  ModalSlice
> = (set) => ({
  txModal: false,
  openTxModal: () => set({ txModal: true }),
  closeTxModal: () => set({ txModal: false }),
});
