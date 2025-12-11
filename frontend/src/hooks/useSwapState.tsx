import { useCallback } from "react";

import { useRootStore } from "@/store/root";

export function useSwapState() {
  const {
    inputAmount,
    outputAmount,
    inputToken,
    outputToken,
    swapDirection,
    setInputAmount,
    setOutputAmount,
    setInputToken,
    setOutputToken,
    setSwapDirection,
    switchTokens,
    resetSwap,
  } = useRootStore();

  const handleInputAmountChange = useCallback(
    (value: string) => {
      setInputAmount(value);
    },
    [setInputAmount],
  );

  const handleOutputAmountChange = useCallback(
    (value: string) => {
      setOutputAmount(value);
    },
    [setOutputAmount],
  );

  const handleSwitchTokens = useCallback(() => {
    switchTokens();
  }, [switchTokens]);

  const isValidSwap =
    !!inputAmount &&
    parseFloat(inputAmount) > 0 &&
    !!inputToken &&
    !!outputToken;

  return {
    inputAmount,
    outputAmount,
    inputToken,
    outputToken,
    swapDirection,
    setInputToken,
    setOutputToken,
    setSwapDirection,
    handleInputAmountChange,
    handleOutputAmountChange,
    handleSwitchTokens,
    resetSwap,
    isValidSwap,
  };
}
