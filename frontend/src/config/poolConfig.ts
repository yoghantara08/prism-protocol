import { CONFIG } from "@/config/config";
import { PoolKey } from "@/types";

export const DEFAULT_POOL_KEY: PoolKey = {
  currency0: "0x0000000000000000000000000000000000000000" as `0x${string}`,
  currency1: "0x0000000000000000000000000000000000000000" as `0x${string}`,
  fee: 3000,
  tickSpacing: 60,
  hooks: CONFIG.PRISM_HOOK_ADDRESS,
};

export const TOKEN_DECIMALS = {
  DEFAULT: 18,
  USDC: 6,
  USDT: 6,
  WBTC: 8,
} as const;

export function createPoolKey(
  token0: `0x${string}`,
  token1: `0x${string}`,
  fee: number = 3000,
  tickSpacing: number = 60,
): PoolKey {
  return {
    currency0: token0,
    currency1: token1,
    fee,
    tickSpacing,
    hooks: CONFIG.PRISM_HOOK_ADDRESS,
  };
}
