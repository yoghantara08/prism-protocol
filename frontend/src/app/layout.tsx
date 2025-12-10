import React from "react";

import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";

import ModalProvider from "@/components/Modal/ModalProvider";
import RainbowKit from "@/components/RainbowKit/RainbowKit";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prism Protocol",
  description:
    "Trade with privacy-first execution layer built with Uniswap V4 Hooks & Fully Homomorphic Encryption Fhenix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <RainbowKit>
          {children}
          <ModalProvider />
        </RainbowKit>
      </body>
    </html>
  );
}
