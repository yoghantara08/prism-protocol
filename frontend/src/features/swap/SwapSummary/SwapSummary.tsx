import React from "react";

const SwapSummary = () => {
  return (
    <div className="bg-surface text-secondary flex flex-col gap-1 rounded-2xl px-4 py-2 text-sm">
      <div className="flex items-center justify-between border-b py-2">
        <span>Exchange Rate</span>

        <div>1.00 USDC = 1.00 USDT</div>
      </div>
      <div className="flex items-center justify-between border-b py-2">
        <span>Fees</span>

        <div>0.000005 ETH</div>
      </div>
      <div className="flex items-center justify-between py-2">
        <span>Minimum received</span>

        <div>1 USDT</div>
      </div>
    </div>
  );
};

export default SwapSummary;
