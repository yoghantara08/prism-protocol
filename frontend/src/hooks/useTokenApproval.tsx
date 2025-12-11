import { useCallback } from "react";

import { Address, erc20Abi, parseUnits } from "viem";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { CONFIG } from "@/config/config";

export function useTokenApproval(
  tokenAddress: Address | null,
  decimals: number = 18,
) {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const approve = useCallback(
    (amount: string) => {
      if (!tokenAddress) throw new Error("Token address not set");

      const amountWei = parseUnits(amount, decimals);

      writeContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [CONFIG.PRISM_HOOK_ADDRESS, amountWei],
      });
    },
    [tokenAddress, decimals, writeContract],
  );

  return {
    approve,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useTokenAllowance(
  tokenAddress: Address | null,
  ownerAddress: Address | undefined,
) {
  const { data, isLoading, refetch } = useReadContract({
    address: tokenAddress || undefined,
    abi: erc20Abi,
    functionName: "allowance",
    args: ownerAddress ? [ownerAddress, CONFIG.PRISM_HOOK_ADDRESS] : undefined,
    query: {
      enabled: !!(tokenAddress && ownerAddress),
    },
  });

  return {
    allowance: data as bigint | undefined,
    isLoading,
    refetch,
  };
}

export function useTokenBalance(
  tokenAddress: Address | null,
  ownerAddress: Address | undefined,
) {
  const { data, isLoading, refetch } = useReadContract({
    address: tokenAddress || undefined,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: ownerAddress ? [ownerAddress] : undefined,
    query: {
      enabled: !!(tokenAddress && ownerAddress),
      refetchInterval: 5000,
    },
  });

  return {
    balance: data as bigint | undefined,
    isLoading,
    refetch,
  };
}
