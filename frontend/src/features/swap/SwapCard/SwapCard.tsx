import React from "react";

import Button from "@/components/Button/Button";

import BuyPanel from "../BuyPanel/BuyPanel";
import SellPanel from "../SellPanel/SellPanel";
import SwapSummary from "../SwapSummary/SwapSummary";
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
        <Button className="w-full" disabled>
          Enter an amount
        </Button>
        <SwapSummary />
      </div>
    </div>
  );
};

export default SwapCard;
