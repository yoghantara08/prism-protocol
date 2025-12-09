import React from "react";
import { LuWallet } from "react-icons/lu";

import AmountInput from "../AmountInput/AmountInput";
import TokenSelect from "../TokenSelect/TokenSelect";

const BuyPanel = () => {
  return (
    <div className="space-y-4 rounded-2xl border px-5 py-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <span className="font-medium">Buy</span>
        <div className="flex gap-2">
          <div className="text-secondary flex items-center gap-1">
            <LuWallet className="mr-1" />
            <span>0.00</span>
            <span>USDT</span>
          </div>
        </div>
      </div>

      {/* INPUT */}
      <div className="flex items-center justify-between">
        <TokenSelect token="usdt" />
        <AmountInput />
      </div>
    </div>
  );
};

export default BuyPanel;
