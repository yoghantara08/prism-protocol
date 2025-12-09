import React from "react";
import { FaChevronDown } from "react-icons/fa6";

import Image from "next/image";

const TokenSelect = () => {
  return (
    <>
      <button className="bg-elevated hover:bg-accent-muted flex items-center gap-2 rounded-3xl px-3 py-2 transition-all">
        <Image
          alt="token"
          src={"/usdc.svg"}
          width={48}
          height={48}
          className="size-8 rounded-full"
        />
        <span className="text-lg font-medium">USDC</span>
        <FaChevronDown />
      </button>
    </>
  );
};

export default TokenSelect;
