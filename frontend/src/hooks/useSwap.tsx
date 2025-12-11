import { useCallback, useEffect, useState } from "react";

import { formatUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";

import { useRootStore } from "@/store/root";
import { PoolKey } from "@/types";

import { useCofhe } from "./useCofhe";
import { useGetOrderDecryptStatus, usePlaceMarketOrder } from "./usePrismHook";
import {
  useTokenAllowance,
  useTokenApproval,
  useTokenBalance,
} from "./useTokenApproval";

interface UseSwapOptions {
  poolKey: PoolKey;
  inputTokenDecimals?: number;
  outputTokenDecimals?: number;
}

export function useSwap({
  poolKey,
  inputTokenDecimals = 18,
  outputTokenDecimals = 18,
}: UseSwapOptions) {
  const { address } = useAccount();
  const { isInitialized: isCofheInitialized } = useCofhe();

  const {
    inputAmount,
    inputToken,
    outputToken,
    swapDirection,
    orderHandle,
    isSwapping,
    setIsSwapping,
    setOrderHandle,
    resetSwap,
  } = useRootStore();

  const [needsApproval, setNeedsApproval] = useState(false);

  const {
    placeOrder,
    isPending: isPlacingOrder,
    isConfirming,
    isSuccess: isOrderPlaced,
    error: placeOrderError,
  } = usePlaceMarketOrder();

  const {
    approve,
    isPending: isApproving,
    isSuccess: isApprovalSuccess,
  } = useTokenApproval(inputToken, inputTokenDecimals);

  const { allowance, refetch: refetchAllowance } = useTokenAllowance(
    inputToken,
    address,
  );

  const { balance, refetch: refetchBalance } = useTokenBalance(
    inputToken,
    address,
  );

  const { isDecrypted } = useGetOrderDecryptStatus(orderHandle);

  const checkApproval = useCallback(async () => {
    if (!inputAmount || !inputToken || !allowance) {
      setNeedsApproval(false);
      return false;
    }

    const amountWei = parseUnits(inputAmount, inputTokenDecimals);
    const needsApproval = allowance < amountWei;
    setNeedsApproval(needsApproval);
    return needsApproval;
  }, [inputAmount, inputToken, allowance, inputTokenDecimals]);

  const checkBalance = useCallback(() => {
    if (!inputAmount || !balance) return false;

    const amountWei = parseUnits(inputAmount, inputTokenDecimals);
    return balance >= amountWei;
  }, [inputAmount, balance, inputTokenDecimals]);

  const handleApprove = useCallback(async () => {
    if (!inputAmount || !inputToken) {
      throw new Error("Missing input amount or token");
    }

    try {
      await approve(inputAmount);
    } catch (error) {
      console.error("Approval failed:", error);
      throw error;
    }
  }, [approve, inputAmount, inputToken]);

  const executeSwap = useCallback(async () => {
    if (!inputAmount || parseFloat(inputAmount) <= 0) {
      throw new Error("Invalid input amount");
    }

    if (!isCofheInitialized) {
      throw new Error("Encryption not initialized");
    }

    if (!checkBalance()) {
      throw new Error("Insufficient balance");
    }

    const needsApprovalCheck = await checkApproval();
    if (needsApprovalCheck) {
      throw new Error("Token approval required");
    }

    const zeroForOne = swapDirection === "sell";
    setIsSwapping(true);

    try {
      await placeOrder(poolKey, zeroForOne, inputAmount, inputTokenDecimals);
    } catch (error) {
      console.error("Swap failed:", error);
      setIsSwapping(false);
      throw error;
    }
  }, [
    inputAmount,
    isCofheInitialized,
    checkBalance,
    checkApproval,
    swapDirection,
    poolKey,
    inputTokenDecimals,
    placeOrder,
    setIsSwapping,
  ]);

  useEffect(() => {
    if (isApprovalSuccess) {
      console.log("✅ Token approval successful");
      refetchAllowance();
    }
  }, [isApprovalSuccess, refetchAllowance]);

  useEffect(() => {
    if (isOrderPlaced) {
      console.log("✅ Order placed successfully");
      refetchBalance();
    }
  }, [isOrderPlaced, refetchBalance]);

  useEffect(() => {
    if (isDecrypted) {
      console.log("✅ Order decrypted and executed");
      setIsSwapping(false);
      resetSwap();
      refetchBalance();
    }
  }, [isDecrypted, setIsSwapping, resetSwap, refetchBalance]);

  useEffect(() => {
    checkApproval();
  }, [checkApproval]);

  const hasInsufficientBalance =
    !checkBalance() && !!inputAmount && parseFloat(inputAmount) > 0;

  const formattedBalance = balance
    ? formatUnits(balance, inputTokenDecimals)
    : "0";

  return {
    executeSwap,
    handleApprove,
    needsApproval,
    hasInsufficientBalance,
    balance: formattedBalance,
    isApproving,
    isPlacingOrder,
    isConfirming,
    isSwapping,
    isDecrypted,
    error: placeOrderError,
    canSwap:
      !needsApproval &&
      !hasInsufficientBalance &&
      !!inputAmount &&
      parseFloat(inputAmount) > 0 &&
      isCofheInitialized,
  };
}
