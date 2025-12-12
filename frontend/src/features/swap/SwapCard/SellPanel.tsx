"use client";
import React from "react";
import { LuWallet } from "react-icons/lu";

import { formatUnits } from "viem";
import { useAccount } from "wagmi";

import { TOKEN_DECIMALS } from "@/config/poolConfig";
import { useSwapState } from "@/hooks/useSwapState";
import { useTokenBalance } from "@/hooks/useTokenApproval";
import { TOKENS } from "@/lib/token";

import TokenSelect from "../TokenSelect/TokenSelect";

import AmountInput from "./AmountInput";
const SellPanel = () => {
  const { address } = useAccount();
  const { inputAmount, inputToken, handleInputAmountChange } = useSwapState();

  const inputTokenMeta = TOKENS.find((t) => t.address === inputToken);
  const { balance } = useTokenBalance(inputToken, address);

  const formattedBalance = balance
    ? parseFloat(formatUnits(balance, TOKEN_DECIMALS.DEFAULT)).toFixed(6)
    : "0.00";

  const handleMaxClick = () => {
    if (balance) {
      const maxAmount = formatUnits(balance, TOKEN_DECIMALS.DEFAULT);
      handleInputAmountChange(maxAmount);
    }
  };

  return (
    <div className="bg-surface space-y-4 rounded-2xl px-5 py-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <span className="font-medium">Sell</span>
        <div className="flex gap-2">
          <div className="text-secondary flex items-center gap-1">
            <LuWallet className="mr-1" />
            <span>{formattedBalance}</span>
            <span>{inputTokenMeta ? inputTokenMeta.symbol : "--"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="bg-elevated text-secondary rounded-lg px-2.5 py-1.5 text-sm font-medium">
              HALF
            </div>
            <div
              onClick={handleMaxClick}
              className="bg-elevated text-secondary hover:bg-accent-muted cursor-pointer rounded-lg px-2.5 py-1.5 text-sm font-medium"
            >
              MAX
            </div>
          </div>
        </div>
      </div>

      {/* INPUT */}
      <div className="flex items-center justify-between">
        <TokenSelect token={inputToken || null} type="input" />
        <AmountInput
          value={inputAmount}
          onChange={handleInputAmountChange}
          placeholder="0.0"
          decimals={TOKEN_DECIMALS.USDC}
        />
      </div>
    </div>
  );
};

export default SellPanel;
