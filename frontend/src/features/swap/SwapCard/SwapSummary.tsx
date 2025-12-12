import React from "react";

import { useSwapState } from "@/hooks/useSwapState";
import { useRootStore } from "@/store/root";

const SwapSummary = () => {
  const { inputAmount, outputAmount } = useSwapState();
  const { slippage } = useRootStore();

  const rate =
    inputAmount && outputAmount
      ? parseFloat(
          (parseFloat(outputAmount) / parseFloat(inputAmount)).toFixed(6),
        )
      : undefined;

  const minimumReceived =
    outputAmount && slippage !== undefined
      ? (parseFloat(outputAmount) * (1 - slippage / 100)).toFixed(6)
      : undefined;

  return (
    <div className="bg-surface text-secondary flex flex-col gap-1 rounded-2xl px-4 py-2 text-sm">
      <div className="flex items-center justify-between border-b py-2">
        <span>Exchange Rate</span>

        <div>{rate ? `1 = ${rate}` : "-"}</div>
      </div>
      <div className="flex items-center justify-between border-b py-2">
        <span>Fees</span>

        <div>0.000005 ETH</div>
      </div>
      <div className="flex items-center justify-between py-2">
        <span>Minimum received</span>

        <div>{minimumReceived ? `${minimumReceived}` : "-"}</div>
      </div>
    </div>
  );
};

export default SwapSummary;
