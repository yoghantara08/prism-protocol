"use client";
import React from "react";

import NumberInput from "@/components/Input/NumberInput";
import useNumberInput from "@/hooks/useNumberInput";

const AmountInput = () => {
  const { displayValue, handleInputBlur, handleInputChange } = useNumberInput();

  return (
    <div className="flex flex-col gap-1.5">
      <NumberInput
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={displayValue}
        placeholder="0.00"
        className="text-primary max-w-[300px] text-3xl font-medium"
      />
      <span className="text-tertiary text-end text-sm">$0</span>
    </div>
  );
};

export default AmountInput;
