import { StateCreator } from "zustand";

import { RootStore } from "./root";

export type TokenSelectType = "input" | "output" | null;

export type ModalSlice = {
  tokenSelectModal: boolean;
  tokenSelectType: TokenSelectType;
  openTokenSelectModal: (type: TokenSelectType) => void;
  closeTokenSelectModal: () => void;
};

export const createModalSlice: StateCreator<
  RootStore,
  [["zustand/subscribeWithSelector", never], ["zustand/devtools", never]],
  [],
  ModalSlice
> = (set) => ({
  tokenSelectModal: false,
  tokenSelectType: null,
  openTokenSelectModal: (type) =>
    set({ tokenSelectModal: true, tokenSelectType: type }),
  closeTokenSelectModal: () =>
    set({ tokenSelectModal: false, tokenSelectType: null }),
});
