"use client";

import { useState } from "react";

import { useCofhe } from "@/hooks/useCofhe";

export default function FHEExample() {
  const {
    isInitialized,
    isInitializing,
    error,
    isChainSupported,
    Encryptable,
    encrypt,
  } = useCofhe();
  const [encryptedData, setEncryptedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEncrypt = async () => {
    if (!isInitialized) {
      alert("FHE not initialized yet");
      return;
    }

    try {
      setLoading(true);

      // Example: Encrypt different types of data
      const result = await encrypt([
        Encryptable.uint64(100n), // Encrypt a number
        Encryptable.bool(true), // Encrypt a boolean
        Encryptable.address("0x5FbDB2315678afecb367f032d93F642f64180aa3"), // Encrypt an address
      ]);

      console.log("Encrypted data:", result);
      setEncryptedData(result);
    } catch (err) {
      console.error("Encryption failed:", err);
      alert("Encryption failed: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Show error if chain is not supported
  if (!isChainSupported) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500 rounded-lg">
        <h3 className="text-red-500 font-semibold mb-2">Unsupported Network</h3>
        <p className="text-sm text-red-400">
          Please connect to Sepolia testnet to use FHE features.
        </p>
      </div>
    );
  }

  // Show error if initialization failed
  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500 rounded-lg">
        <h3 className="text-red-500 font-semibold mb-2">
          Initialization Error
        </h3>
        <p className="text-sm text-red-400">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 border border-gray-700 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Fully Homomorphic Encryption</h2>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isInitialized ? "bg-green-500" : "bg-yellow-500"
            }`}
          />
          <span className="text-sm">
            Status:{" "}
            {isInitializing
              ? "Initializing..."
              : isInitialized
              ? "Ready"
              : "Not Initialized"}
          </span>
        </div>
      </div>

      <button
        onClick={handleEncrypt}
        disabled={!isInitialized || loading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
      >
        {loading ? "Encrypting..." : "Encrypt Data"}
      </button>

      {encryptedData && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Encrypted Data:</p>
          <pre className="text-xs overflow-auto">
            {encryptedData.data[0].signature}
          </pre>
        </div>
      )}
    </div>
  );
}
