import React from "react";
import { LuWallet } from "react-icons/lu";

import AmountInput from "../AmountInput/AmountInput";
import TokenSelect from "../TokenSelect/TokenSelect";

const SellPanel = () => {
  return (
    <div className="bg-surface space-y-5 rounded-2xl px-5 py-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <span className="font-medium">Sell</span>
        <div className="flex gap-2">
          <div className="text-secondary flex items-center gap-1">
            <LuWallet className="mr-1" />
            <span>0.00</span>
            <span>USDC</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="bg-elevated text-secondary rounded-lg px-2.5 py-1.5 text-sm font-medium">
              HALF
            </div>
            <div className="bg-elevated text-secondary rounded-lg px-2.5 py-1.5 text-sm font-medium">
              MAX
            </div>
          </div>
        </div>
      </div>

      {/* INPUT */}
      <div className="flex items-center justify-between">
        <TokenSelect />
        <AmountInput />
      </div>
    </div>
  );
};

export default SellPanel;
