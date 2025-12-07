import React from "react";

import Button from "@/components/Button/Button";

const SwapTabs = () => {
  return (
    <div className="flex items-center border-b px-4 py-3">
      <Button className="w-full">Market</Button>
      <Button className="w-full border-transparent!" variant="secondary">
        Limit
      </Button>
      <Button className="w-full border-transparent!" variant="secondary">
        Recurring
      </Button>
    </div>
  );
};

export default SwapTabs;
