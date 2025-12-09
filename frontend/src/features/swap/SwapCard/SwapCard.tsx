import React from "react";

import BuyPanel from "../BuyPanel/BuyPanel";
import SellPanel from "../SellPanel/SellPanel";
import SwapTabs from "../SwapTabs/SwapTabs";

import SwapDirectionButton from "./SwapDirectionButton";

const SwapCard = () => {
  return (
    <div className="w-full max-w-[600px] rounded-2xl border">
      <SwapTabs />
      <div className="space-y-3 p-5">
        <SellPanel />
        <SwapDirectionButton />
        <BuyPanel />
      </div>
    </div>
  );
};

export default SwapCard;
