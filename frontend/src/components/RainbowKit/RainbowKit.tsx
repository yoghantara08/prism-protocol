"use client";
import { ReactNode } from "react";

import {
  getDefaultConfig,
  RainbowKitProvider,
  Theme,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";

import { CONFIG } from "@/config/config";

import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "Prism Protocol",
  projectId: CONFIG.PROJECT_ID,
  chains: [sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

const customTheme: Theme = {
  blurs: {
    modalOverlay: "6px",
  },
  colors: {
    accentColor: "var(--color-elevated)",
    accentColorForeground: "#FFFFFF",

    actionButtonBorder: "var(--color-border)",
    actionButtonBorderMobile: "var(--color-border)",
    actionButtonSecondaryBackground: "var(--color-surface)",

    closeButton: "var(--color-text-dim, #aab3c5)",
    closeButtonBackground: "var(--color-elevated)",

    connectButtonBackground: "var(--color-elevated)",
    connectButtonBackgroundError: "var(--color-elevated)",
    connectButtonInnerBackground: "var(--color-elevated)",
    connectButtonText: "#FFFFFF",
    connectButtonTextError: "#FFFFFF",

    connectionIndicator: "#26a17b",

    downloadBottomCardBackground: "var(--color-surface)",
    downloadTopCardBackground: "var(--color-elevated)",

    error: "var(--color-accent, #ff007a)",

    generalBorder: "var(--color-border)",
    generalBorderDim: "var(--color-border)",

    menuItemBackground: "var(--color-surface)",

    modalBackdrop: "var(--color-overlay)",
    modalBackground: "var(--color-surface)",
    modalBorder: "var(--color-border)",
    modalText: "var(--color-text, #ffffff)",
    modalTextDim: "var(--color-text-dim, #aab3c5)",
    modalTextSecondary: "var(--color-text-secondary, #7c8aa0)",

    profileAction: "var(--color-surface)",
    profileActionHover: "var(--color-elevated)",
    profileForeground: "var(--color-background)",

    selectedOptionBorder: "var(--color-accent, #ff007a)",
    standby: "var(--color-accent, #ff007a)",
  },
  fonts: {
    body: "var(--font-inter)",
  },
  radii: {
    actionButton: "6px",
    connectButton: "6px",
    menuButton: "6px",
    modal: "8px",
    modalMobile: "8px",
  },
  shadows: {
    connectButton: "0 0 8px var(--color-overlay)",
    dialog: "0px 10px 20px rgba(0, 0, 0, 0.4)",
    profileDetailsAction: "0px 2px 5px rgba(0, 0, 0, 0.25)",
    selectedOption: "0px 0px 6px var(--color-accent, #ff007a)",
    selectedWallet: "0px 0px 10px var(--color-accent, #ff007a)",
    walletLogo: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  },
};

const RainbowKit = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowKit;
