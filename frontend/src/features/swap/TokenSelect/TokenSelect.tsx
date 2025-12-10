"use client";
import React from "react";
import { FaChevronDown } from "react-icons/fa6";

import Image from "next/image";

import { useRootStore } from "@/store/root";

interface TokenSelectProps {
  token: string;
}

const TokenSelect: React.FC<TokenSelectProps> = ({ token }) => {
  const { openTokenSelectModal } = useRootStore((state) => state);

  return (
    <button
      onClick={openTokenSelectModal}
      className="bg-elevated hover:bg-accent-muted flex items-center gap-2 rounded-3xl px-3 py-2 transition-all"
    >
      <Image
        alt="token"
        src={`/${token}.svg`}
        width={48}
        height={48}
        className="size-8 rounded-full"
      />
      <span className="text-lg font-medium uppercase">{token}</span>
      <FaChevronDown />
    </button>
  );
};

export default TokenSelect;
