import React from "react";

import SellPanel from "../SellPanel/SellPanel";
import SwapTabs from "../SwapTabs/SwapTabs";

const SwapCard = () => {
  return (
    <div className="w-full max-w-[600px] rounded-2xl border">
      <SwapTabs />
      <div className="p-5">
        <SellPanel />
      </div>
    </div>
  );
};

export default SwapCard;
