"use client";

import React from "react";

import { useAccount } from "wagmi";

import Button from "@/components/Button/Button";
import { CONFIG } from "@/config/config";
import { createPoolKey, TOKEN_DECIMALS } from "@/config/poolConfig";
import { useCofhe } from "@/hooks/useCofhe";
import { usePrismEvents } from "@/hooks/usePrismEvents";
import { useSwap } from "@/hooks/useSwap";
import { useSwapState } from "@/hooks/useSwapState";

import SwapTabs from "../SwapTabs/SwapTabs";

import BuyPanel from "./BuyPanel";
import SellPanel from "./SellPanel";
import SwapDirectionButton from "./SwapDirectionButton";
import SwapSummary from "./SwapSummary";

const POOL_KEY = createPoolKey(
  CONFIG.USDC_ADDRESS as `0x${string}`,
  CONFIG.USDT_ADDRESS as `0x${string}`,
  3000,
  60,
);

const SwapCard = () => {
  const { address, isConnected } = useAccount();
  const { isInitialized: isCofheInitialized, isInitializing } = useCofhe();
  const { isValidSwap } = useSwapState();

  const {
    executeSwap,
    handleApprove,
    needsApproval,
    hasInsufficientBalance,
    balance,
    isApproving,
    isPlacingOrder,
    isConfirming,
    isSwapping,
    canSwap,
  } = useSwap({
    poolKey: POOL_KEY,
    inputTokenDecimals: TOKEN_DECIMALS.USDC,
    outputTokenDecimals: TOKEN_DECIMALS.USDT,
  });

  usePrismEvents();

  const handleSwapClick = async () => {
    try {
      if (needsApproval) {
        await handleApprove();
      } else {
        await executeSwap();
      }
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  const getButtonText = () => {
    if (!isConnected) return "Connect Wallet";
    if (isInitializing) return "Initializing Encryption...";
    if (!isCofheInitialized) return "Encryption Not Ready";
    if (!isValidSwap) return "Enter Amount";
    if (hasInsufficientBalance) return "Insufficient Balance";
    if (isApproving) return "Approving...";
    if (needsApproval) return "Approve Token";
    if (isPlacingOrder) return "Placing Order...";
    if (isConfirming) return "Confirming...";
    if (isSwapping) return "Processing Order...";
    return "Swap";
  };

  const isButtonDisabled =
    !isConnected ||
    !isCofheInitialized ||
    !canSwap ||
    isApproving ||
    isPlacingOrder ||
    isConfirming ||
    isSwapping ||
    hasInsufficientBalance;

  return (
    <div className="w-full max-w-[600px] rounded-2xl border">
      <SwapTabs />
      <div className="space-y-3 p-5">
        <SellPanel />
        <SwapDirectionButton />
        <BuyPanel />
        <SwapSummary />

        {/* {address && balance && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Balance: {parseFloat(balance).toFixed(6)}
          </div>
        )} */}

        <Button
          onClick={handleSwapClick}
          disabled={isButtonDisabled}
          className="w-full"
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default SwapCard;
