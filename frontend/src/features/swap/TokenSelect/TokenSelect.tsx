"use client";
import React from "react";
import { FaChevronDown } from "react-icons/fa6";

import Image from "next/image";

import { TOKENS } from "@/lib/token";
import { useRootStore } from "@/store/root";

interface TokenSelectProps {
  token: `0x${string}` | string | null;
  type: "input" | "output";
}

const TokenSelect: React.FC<TokenSelectProps> = ({ token, type }) => {
  const { openTokenSelectModal } = useRootStore((state) => state);

  const handleClick = () => {
    openTokenSelectModal(type);
  };

  const tokenMeta =
    typeof token === "string"
      ? TOKENS.find((t) => t.address === token || t.symbol === token)
      : undefined;
  const isSelected = !!tokenMeta;

  return (
    <button
      onClick={handleClick}
      className="bg-elevated hover:bg-accent-muted flex items-center gap-2 rounded-3xl px-3 py-2 transition-all"
    >
      <Image
        alt="token"
        src={tokenMeta ? tokenMeta.img : "/token-placeholder.svg"}
        width={48}
        height={48}
        className="size-8 rounded-full"
      />
      <span className="text-lg font-medium uppercase">
        {isSelected ? tokenMeta!.symbol : "Select token"}
      </span>
      <FaChevronDown />
    </button>
  );
};

export default TokenSelect;
