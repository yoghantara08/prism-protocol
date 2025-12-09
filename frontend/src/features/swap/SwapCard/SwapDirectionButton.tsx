import React from "react";
import { LuMoveDown } from "react-icons/lu";

const SwapDirectionButton = () => {
  return (
    <div className="flex justify-center">
      <div className="text-secondary bg-surface border-elevated! flex w-fit items-center justify-center rounded-full border p-1.5">
        <LuMoveDown />
      </div>
    </div>
  );
};

export default SwapDirectionButton;
