"use client";
import React from "react";

import Image from "next/image";

import classNames from "classnames";

import Modal from "@/components/Modal/Modal";
import { useRootStore } from "@/store/root";

const TokenSelectModal = () => {
  const { tokenSelectModal, closeTokenSelectModal } = useRootStore(
    (state) => state,
  );

  const tokens = [
    { label: "USDC", address: "0x0000...0001", img: "/usdc.svg" },
    { label: "USDT", address: "0x0000...0002", img: "/usdt.svg" },
  ];

  return (
    <Modal
      isOpen={tokenSelectModal}
      onClose={closeTokenSelectModal}
      title="Select Token"
    >
      <div className="space-y-2 py-4">
        {tokens.map((token) => (
          <div
            key={token.label}
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
        ))}
      </div>
    </Modal>
  );
};

export default TokenSelectModal;
