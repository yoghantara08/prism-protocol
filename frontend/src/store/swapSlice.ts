/* eslint-disable no-unused-vars */
import { Address } from "viem";
import { StateCreator } from "zustand";

import { Order, OrderStatus, SwapDirection } from "@/types";

import { RootStore } from "./root";
import { CONFIG } from "@/config/config";

export type SwapSlice = {
  inputAmount: string;
  outputAmount: string;
  inputToken: Address | null;
  outputToken: Address | null;
  swapDirection: SwapDirection;
  isSwapping: boolean;
  orderHandle: bigint | null;
  slippage: number;
  orderHistory: Order[];

  setInputAmount: (amount: string) => void;
  setOutputAmount: (amount: string) => void;
  setInputToken: (token: Address) => void;
  setOutputToken: (token: Address) => void;
  setSwapDirection: (direction: SwapDirection) => void;
  setIsSwapping: (isSwapping: boolean) => void;
  setOrderHandle: (handle: bigint | null) => void;
  setSlippage: (slippage: number) => void;
  switchTokens: () => void;
  resetSwap: () => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (handle: bigint, status: OrderStatus) => void;
};

export const createSwapSlice: StateCreator<
  RootStore,
  [["zustand/subscribeWithSelector", never], ["zustand/devtools", never]],
  [],
  SwapSlice
> = (set, get) => ({
  inputAmount: "",
  outputAmount: "",
  inputToken: CONFIG.USDC_ADDRESS,
  outputToken: CONFIG.USDT_ADDRESS,
  swapDirection: "buy",
  isSwapping: false,
  orderHandle: null,
  slippage: 0.5,
  orderHistory: [],

  setInputAmount: (amount) => set({ inputAmount: amount }),
  setOutputAmount: (amount) => set({ outputAmount: amount }),
  setInputToken: (token) => set({ inputToken: token }),
  setOutputToken: (token) => set({ outputToken: token }),
  setSwapDirection: (direction) => set({ swapDirection: direction }),
  setIsSwapping: (isSwapping) => set({ isSwapping }),
  setOrderHandle: (handle) => set({ orderHandle: handle }),
  setSlippage: (slippage) => set({ slippage }),

  switchTokens: () => {
    const { inputToken, outputToken, swapDirection } = get();
    set({
      inputToken: outputToken,
      outputToken: inputToken,
      swapDirection: swapDirection === "buy" ? "sell" : "buy",
      inputAmount: "",
      outputAmount: "",
    });
  },

  resetSwap: () =>
    set({
      inputAmount: "",
      outputAmount: "",
      isSwapping: false,
      orderHandle: null,
    }),

  addOrder: (order) =>
    set((state) => ({
      orderHistory: [order, ...state.orderHistory],
    })),

  updateOrderStatus: (handle, status) =>
    set((state) => ({
      orderHistory: state.orderHistory.map((order) =>
        order.handle === handle ? { ...order, status } : order,
      ),
    })),
});
