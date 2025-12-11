import { useCallback } from "react";

import { parseUnits } from "viem";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { CONFIG } from "@/config/config";
import { useCofhe } from "@/hooks/useCofhe";
import PrismHookABI from "@/lib/PrismHookABI.json";
import { PoolKey } from "@/types";

export function usePlaceMarketOrder() {
  const { encrypt, isInitialized } = useCofhe();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const placeOrder = useCallback(
    async (
      poolKey: PoolKey,
      zeroForOne: boolean,
      amount: string,
      decimals: number = 18,
    ) => {
      if (!isInitialized || !encrypt) {
        throw new Error("Encryption not initialized");
      }

      if (!amount || parseFloat(amount) <= 0) {
        throw new Error("Invalid amount");
      }

      const amountWei = parseUnits(amount, decimals);
      const encryptedAmount = await encrypt([amountWei, "euint128"]);

      writeContract({
        address: CONFIG.PRISM_HOOK_ADDRESS,
        abi: PrismHookABI,
        functionName: "placeMarketOrder",
        args: [poolKey, zeroForOne, encryptedAmount],
      });
    },
    [encrypt, isInitialized, writeContract],
  );

  return {
    placeOrder,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useFlushOrder() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const flushOrder = useCallback(
    (poolKey: PoolKey) => {
      writeContract({
        address: CONFIG.PRISM_HOOK_ADDRESS,
        abi: PrismHookABI,
        functionName: "flushOrder",
        args: [poolKey],
      });
    },
    [writeContract],
  );

  return {
    flushOrder,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useGetOrderDecryptStatus(handle: bigint | null) {
  const { data, isLoading, isError, refetch } = useReadContract({
    address: CONFIG.PRISM_HOOK_ADDRESS,
    abi: PrismHookABI,
    functionName: "getOrderDecryptStatus",
    args: handle ? [handle] : undefined,
    query: {
      enabled: !!handle,
      refetchInterval: 3000,
    },
  });

  return {
    isDecrypted: data as boolean | undefined,
    isLoading,
    isError,
    refetch,
  };
}

export function useGetUserOrder(
  poolKey: PoolKey | null,
  handle: bigint | null,
) {
  const { data, isLoading, isError } = useReadContract({
    address: CONFIG.PRISM_HOOK_ADDRESS,
    abi: PrismHookABI,
    functionName: "getUserOrder",
    args: poolKey && handle ? [poolKey, handle] : undefined,
    query: {
      enabled: !!(poolKey && handle),
    },
  });

  return {
    userAddress: data as `0x${string}` | undefined,
    isLoading,
    isError,
  };
}

export function useCreatePoolQueue() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const createQueue = useCallback(
    (poolKey: PoolKey, zeroForOne: boolean) => {
      writeContract({
        address: CONFIG.PRISM_HOOK_ADDRESS,
        abi: PrismHookABI,
        functionName: "createPoolQueue",
        args: [poolKey, zeroForOne],
      });
    },
    [writeContract],
  );

  return {
    createQueue,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}
