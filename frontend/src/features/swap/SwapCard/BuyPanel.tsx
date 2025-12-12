"use client";
import React from "react";
import { LuWallet } from "react-icons/lu";

import { TOKEN_DECIMALS } from "@/config/poolConfig";
import { useSwapState } from "@/hooks/useSwapState";
import { TOKENS } from "@/lib/token";

import TokenSelect from "../TokenSelect/TokenSelect";

import AmountInput from "./AmountInput";

const BuyPanel = () => {
  const { outputAmount, outputToken, handleOutputAmountChange } =
    useSwapState();

  const outputTokenMeta = TOKENS.find((t) => t.address === outputToken);

  return (
    <div className="bg-surface space-y-4 rounded-2xl px-5 py-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <span className="font-medium">Buy</span>
        <div className="flex gap-2">
          <div className="text-secondary flex items-center gap-1">
            <LuWallet className="mr-1" />
            <span>
              {outputAmount ? parseFloat(outputAmount).toFixed(6) : "0.00"}
            </span>
            <span>{outputTokenMeta ? outputTokenMeta.symbol : "--"}</span>
          </div>
        </div>
      </div>

      {/* INPUT */}
      <div className="flex items-center justify-between">
        <TokenSelect token={outputToken || null} type="output" />
        <AmountInput
          value={outputAmount}
          onChange={handleOutputAmountChange}
          readOnly
          placeholder="0.0"
          decimals={TOKEN_DECIMALS.USDT}
        />
      </div>
    </div>
  );
};

export default BuyPanel;
