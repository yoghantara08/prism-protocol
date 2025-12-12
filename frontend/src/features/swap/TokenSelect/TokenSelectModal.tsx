"use client";
import React from "react";

import Image from "next/image";

import classNames from "classnames";

import Modal from "@/components/Modal/Modal";
import { IToken, TOKENS } from "@/lib/token";
import { useRootStore } from "@/store/root";

const TokenSelectModal = () => {
  const {
    tokenSelectModal,
    closeTokenSelectModal,
    tokenSelectType,
    inputToken,
    outputToken,
    setInputToken,
    setOutputToken,
  } = useRootStore();

  const handleTokenSelect = (token: IToken) => {
    if (tokenSelectType === "input") {
      setInputToken(token.address);
    } else if (tokenSelectType === "output") {
      setOutputToken(token.address);
    }
    closeTokenSelectModal();
  };

  const isTokenDisabled = (tokenAddress: `0x${string}`) => {
    return tokenAddress === inputToken || tokenAddress === outputToken;
  };

  return (
    <Modal
      isOpen={tokenSelectModal}
      onClose={closeTokenSelectModal}
      title="Select Token"
    >
      <div className="space-y-2 py-4">
        {TOKENS.map((token) => {
          const disabled = isTokenDisabled(token.address);

          return (
            <div
              key={token.address}
              onClick={() => !disabled && handleTokenSelect(token)}
              className={classNames(
                "bg-surface hover:bg-elevated flex cursor-pointer items-center gap-3",
                "rounded-xl px-5 py-4 transition-all duration-100",
              )}
            >
              <Image
                alt="token"
                src={token.img}
                width={48}
                height={48}
                className="size-10 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{token.label}</span>
                <span className="text-secondary">{token.address}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default TokenSelectModal;
