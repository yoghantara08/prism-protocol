import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

import { createGlobalSlice, GlobalSlice } from "./globalSlice";
import { createModalSlice, ModalSlice } from "./modalSlice";
import { createSwapSlice, SwapSlice } from "./swapSlice";

export type RootStore = ModalSlice & GlobalSlice & SwapSlice;

export const useRootStore = create<RootStore>()(
  subscribeWithSelector(
    devtools((...args) => ({
      ...createModalSlice(...args),
      ...createGlobalSlice(...args),
      ...createSwapSlice(...args),
    })),
  ),
);
