"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  cofhejs,
  Encryptable,
  Environment,
  FheTypes,
  Permit,
  permitStore,
} from "cofhejs/web";
import { Address } from "viem";
import { sepolia } from "viem/chains";
import { useChainId, usePublicClient, useWalletClient } from "wagmi";

// Define types based on the store structure
type AccountRecord<T> = Record<Address, T>;
type ChainRecord<T> = Record<number, T>;

// Track initialization state globally
let isInitializedGlobally = false;

interface CofheConfig {
  environment: Environment;
  coFheUrl?: string;
  verifierUrl?: string;
  thresholdNetworkUrl?: string;
  ignoreErrors?: boolean;
  generatePermit?: boolean;
}

// Chain environment mapping
const ChainEnvironments = {
  [sepolia.id]: "TESTNET",
} as const;

export function useCofhe(config?: Partial<CofheConfig>) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const chainId = useChainId();

  const accountAddress = walletClient?.account.address;

  const [isInitialized, setIsInitialized] = useState(isInitializedGlobally);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [permit, setPermit] = useState<Permit | undefined>(undefined);

  // Use ref to store config to avoid dependency issues
  const configRef = useRef(config);
  configRef.current = config;

  // Check if we're in a browser environment
  const isBrowser = typeof window !== "undefined";

  // Check if connected chain is supported (Sepolia)
  const isChainSupported = useMemo(() => {
    return chainId === sepolia.id;
  }, [chainId]);

  // Reset initialization when chain or account changes
  useEffect(() => {
    isInitializedGlobally = false;
    setIsInitialized(false);
    setPermit(undefined);
    setError(null);
  }, [chainId, accountAddress]);

  // Initialize when wallet is connected
  useEffect(() => {
    // Skip initialization if not in browser
    if (!isBrowser) return;

    const initialize = async () => {
      // Skip if already initialized/initializing or missing required clients
      if (
        isInitializedGlobally ||
        isInitializing ||
        !publicClient ||
        !walletClient
      ) {
        return;
      }

      // Skip if chain is not supported
      if (!isChainSupported) {
        setError(
          new Error(`Unsupported chain. Please connect to Sepolia testnet.`),
        );
        return;
      }

      try {
        setIsInitializing(true);
        setError(null);

        const environment =
          ChainEnvironments[chainId as keyof typeof ChainEnvironments] ??
          "TESTNET";

        const defaultConfig = {
          environment,
          verifierUrl: undefined,
          coFheUrl: undefined,
          thresholdNetworkUrl: undefined,
          ignoreErrors: false,
          generatePermit: true,
        };

        // Merge default config with user-provided config using ref
        const mergedConfig = { ...defaultConfig, ...configRef.current };

        console.log("Initializing Cofhe with config:", {
          environment: mergedConfig.environment,
          chainId,
        });

        const result = await cofhejs.initializeWithViem({
          viemClient: publicClient,
          viemWalletClient: walletClient,
          environment: mergedConfig.environment,
          verifierUrl: mergedConfig.verifierUrl,
          coFheUrl: mergedConfig.coFheUrl,
          thresholdNetworkUrl: mergedConfig.thresholdNetworkUrl,
          ignoreErrors: mergedConfig.ignoreErrors,
          generatePermit: mergedConfig.generatePermit,
        });

        if (result.success) {
          console.log("Cofhe initialized successfully");
          isInitializedGlobally = true;
          setIsInitialized(true);
          setPermit(result.data);
          setError(null);
        } else {
          const errorMsg = result.error?.message || String(result.error);
          console.error("Cofhe initialization failed:", errorMsg);
          setError(new Error(errorMsg));
        }
      } catch (err) {
        console.error("Failed to initialize Cofhe:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Unknown error initializing Cofhe"),
        );
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
  }, [
    walletClient,
    publicClient,
    chainId,
    accountAddress,
    isChainSupported,
    isBrowser,
    isInitializing,
  ]);

  return {
    isInitialized,
    isInitializing,
    error,
    permit,
    isChainSupported,
    // Expose the original library functions directly
    ...cofhejs,
    FheTypes,
    Encryptable,
  };
}

export const useCofhejsInitialized = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = cofhejs.store.subscribe((state) =>
      setInitialized(
        state.providerInitialized &&
          state.signerInitialized &&
          state.fheKeysInitialized,
      ),
    );

    // Initial state
    const initialState = cofhejs.store.getState();
    setInitialized(
      initialState.providerInitialized &&
        initialState.signerInitialized &&
        initialState.fheKeysInitialized,
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return initialized;
};

export const useCofhejsAccount = () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = cofhejs.store.subscribe((state) => {
      setAccount(state.account);
    });

    // Initial state
    setAccount(cofhejs.store.getState().account);

    return () => {
      unsubscribe();
    };
  }, []);

  return account;
};

export const useCofhejsActivePermitHashes = () => {
  const [activePermitHash, setActivePermitHash] = useState<
    ChainRecord<AccountRecord<string | undefined>>
  >({});

  useEffect(() => {
    const unsubscribe = permitStore.store.subscribe((state) => {
      setActivePermitHash(state.activePermitHash);
    });

    setActivePermitHash(permitStore.store.getState().activePermitHash);

    return () => {
      unsubscribe();
    };
  }, []);

  return useMemo(() => activePermitHash, [activePermitHash]);
};

export const useCofhejsActivePermitHash = () => {
  const account = useCofhejsAccount();
  const activePermitHashes = useCofhejsActivePermitHashes();
  const chainId = useChainId();

  return useMemo(() => {
    if (!account || !chainId) return undefined;
    return activePermitHashes[chainId]?.[account as Address];
  }, [account, activePermitHashes, chainId]);
};

export const useCofhejsActivePermit = () => {
  const account = useCofhejsAccount();
  const initialized = useCofhejsInitialized();
  const activePermitHash = useCofhejsActivePermitHash();
  const chainId = useChainId();

  return useMemo(() => {
    if (!account || !initialized || !chainId) return undefined;
    return permitStore.getPermit(chainId.toString(), account, activePermitHash);
  }, [account, initialized, activePermitHash, chainId]);
};

export const useCofhejsAllPermits = () => {
  const account = useCofhejsAccount();
  const initialized = useCofhejsInitialized();
  const [allPermits, setAllPermits] = useState<Permit[] | undefined>(undefined);

  useEffect(() => {
    if (!account || !initialized) {
      setAllPermits(undefined);
      return;
    }

    const updatePermits = () => {
      const permitsFromStore = cofhejs.getAllPermits();
      setAllPermits(Object.values(permitsFromStore?.data ?? {}));
    };

    // Initial state
    updatePermits();

    // Subscribe to store changes
    const unsubscribe = permitStore.store.subscribe(updatePermits);

    return () => {
      unsubscribe();
    };
  }, [account, initialized]);

  return allPermits;
};

// Export FheTypes directly for convenience
export { FheTypes } from "cofhejs/web";
