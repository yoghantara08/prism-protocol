import { useEffect } from "react";
import { toast } from "react-hot-toast";

import { useWatchContractEvent } from "wagmi";
import { useAccount } from "wagmi";

import { CONFIG } from "@/config/config";
import PrismHookABI from "@/lib/PrismHookABI.json";
import { useRootStore } from "@/store/root";

export function usePrismEvents() {
  const { address } = useAccount();
  const {
    setOrderHandle,
    setIsSwapping,
    addOrder,
    updateOrderStatus,
    resetSwap,
  } = useRootStore();

  useWatchContractEvent({
    address: CONFIG.PRISM_HOOK_ADDRESS,
    abi: PrismHookABI,
    eventName: "OrderPlaced",
    onLogs: (logs) => {
      logs.forEach((log) => {
        const { user, handle } = log.args;

        if (user === address) {
          console.log("Order placed:", { user, handle });

          setOrderHandle(handle as bigint);

          addOrder({
            handle: handle as bigint,
            user: user as `0x${string}`,
            status: "pending",
            timestamp: Date.now(),
          });

          toast.success("Order placed successfully!");
        }
      });
    },
  });

  useWatchContractEvent({
    address: CONFIG.PRISM_HOOK_ADDRESS,
    abi: PrismHookABI,
    eventName: "OrderSettled",
    onLogs: (logs) => {
      logs.forEach((log) => {
        const { user, handle } = log.args;

        if (user === address) {
          console.log("Order settled:", { user, handle });

          updateOrderStatus(handle as bigint, "settled");
          setIsSwapping(false);
          resetSwap();

          toast.success("Order settled successfully!");
        }
      });
    },
  });

  useWatchContractEvent({
    address: CONFIG.PRISM_HOOK_ADDRESS,
    abi: PrismHookABI,
    eventName: "OrderFailed",
    onLogs: (logs) => {
      logs.forEach((log) => {
        const { user, handle } = log.args;

        if (user === address) {
          console.error("Order failed:", { user, handle });

          updateOrderStatus(handle as bigint, "failed");
          setIsSwapping(false);

          toast.error("Order failed. Please try again.");
        }
      });
    },
  });

  useEffect(() => {
    if (address) {
      console.log("Listening for PrismHook events for address:", address);
    }
  }, [address]);
}
