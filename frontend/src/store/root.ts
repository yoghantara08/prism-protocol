import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

import { createGlobalSlice, GlobalSlice } from "./globalSlice";
import { createModalSlice, ModalSlice } from "./modalSlice";

export type RootStore = ModalSlice & GlobalSlice;

export const useRootStore = create<RootStore>()(
  subscribeWithSelector(
    devtools((...args) => ({
      ...createModalSlice(...args),
      ...createGlobalSlice(...args),
    })),
  ),
);
