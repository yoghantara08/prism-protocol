import React from "react";

import SwapTabs from "../SwapTabs/SwapTabs";

const SwapCard = () => {
  return (
    <div className="w-full max-w-[600px] rounded-2xl border">
      <SwapTabs />
      <div className="h-30"></div>
    </div>
  );
};

export default SwapCard;
