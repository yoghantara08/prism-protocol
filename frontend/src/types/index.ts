import { Address } from "viem";

export type PoolKey = {
  currency0: Address;
  currency1: Address;
  fee: number;
  tickSpacing: number;
  hooks: Address;
};

export type OrderStatus = "pending" | "decrypted" | "settled" | "failed";

export type Order = {
  handle: bigint;
  user: Address;
  status: OrderStatus;
  timestamp: number;
};

export type SwapDirection = "buy" | "sell";

export type TokenInfo = {
  address: Address;
  symbol: string;
  decimals: number;
  name: string;
};
