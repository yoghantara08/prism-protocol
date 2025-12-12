"use client";

import React, { useEffect } from "react";

import NumberInput from "@/components/Input/NumberInput";
import useNumberInput from "@/hooks/useNumberInput";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  decimals?: number;
}

const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  placeholder = "0.0",
  readOnly = false,
  decimals = 18,
}) => {
  const { displayValue, handleInputChange, handleInputBlur } = useNumberInput(
    0,
    undefined,
    decimals,
  );

  useEffect(() => {
    if (value !== displayValue) {
      handleInputChange(value);
    }
  }, [value, displayValue, handleInputChange]);

  const handleChange = (inputValue: string) => {
    handleInputChange(inputValue);
    onChange(inputValue);
  };

  if (readOnly) {
    return (
      <div className="flex flex-col gap-1.5">
        <NumberInput
          onChange={() => {}}
          value={value || "0.00"}
          placeholder={placeholder}
          className="text-primary max-w-[300px] cursor-not-allowed text-3xl font-medium opacity-60"
        />
        <span className="text-tertiary text-end text-sm">$0</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <NumberInput
        onChange={handleChange}
        onBlur={handleInputBlur}
        value={displayValue}
        placeholder={placeholder}
        className="text-primary max-w-[300px] text-3xl font-medium"
      />
      <span className="text-tertiary text-end text-sm">$0</span>
    </div>
  );
};

export default AmountInput;
