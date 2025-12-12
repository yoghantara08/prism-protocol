import { parseUnits } from "viem";
import { useReadContract } from "wagmi";

import { CONFIG } from "@/config/config";

const QuoterABI = [
  {
    inputs: [
      { internalType: "address", name: "tokenIn", type: "address" },
      { internalType: "address", name: "tokenOut", type: "address" },
      { internalType: "uint24", name: "fee", type: "uint24" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint160", name: "sqrtPriceLimitX96", type: "uint160" },
    ],
    name: "quoteExactInputSingle",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

export function useUniswapQuote(
  tokenIn: `0x${string}` | undefined | null,
  tokenOut: `0x${string}` | undefined | null,
  fee: number | undefined,
  amountIn: string | undefined,
  decimals: number = 18,
) {
  const quoter = CONFIG.UNISWAP_QUOTER_ADDRESS || undefined;

  const amountInWei =
    amountIn && amountIn !== "0" ? parseUnits(amountIn, decimals) : undefined;

  const { data, isLoading, refetch, isError } = useReadContract({
    address: quoter,
    abi: QuoterABI,
    functionName: "quoteExactInputSingle",
    args:
      tokenIn && tokenOut && fee !== undefined && amountInWei
        ? [tokenIn, tokenOut, fee, amountInWei, 0n]
        : undefined,
    query: {
      enabled: !!(tokenIn && tokenOut && fee !== undefined && amountInWei),
    },
  });

  return {
    amountOut: data as bigint | undefined,
    isLoading,
    refetch,
    isError,
  };
}

export default useUniswapQuote;
