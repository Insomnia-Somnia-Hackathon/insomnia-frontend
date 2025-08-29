"use client";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import type { Address } from "viem";
import { ABI_INSOMNIA_VAULT } from "@/app/constants/abis";
import { useState } from "react";

export function useUnpauseVault(vault: Address) {
  const {
    writeContractAsync,
    data: hash,
    isPending,
    error,
  } = useWriteContract();
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const wait = useWaitForTransactionReceipt({ hash: txHash });

  async function unpause() {
    const tx = await writeContractAsync({
      address: vault,
      abi: ABI_INSOMNIA_VAULT,
      functionName: "unpause",
      args: [],
    });
    setTxHash(tx);
    return tx;
  }

  return {
    unpause,
    txHash,
    isPending: isPending || wait.isLoading,
    isSuccess: wait.isSuccess,
    error: error ?? wait.error,
  };
}
