"use client";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { ABI_INSOMNIA_VAULT } from "@/app/constants/abis";
import type { Address } from "viem";
import { useState } from "react";

export function useDepositNative(vault: Address) {
  const { address } = useAccount();
  const {
    writeContractAsync,
    data: hash,
    isPending,
    error,
  } = useWriteContract();
  const [lastHash, setLastHash] = useState<`0x${string}` | undefined>(
    undefined
  );

  async function deposit(amountWei: bigint, receiver?: Address) {
    if (!address) throw new Error("Connect wallet first");
    const tx = await writeContractAsync({
      address: vault,
      abi: ABI_INSOMNIA_VAULT,
      functionName: "depositNative",
      args: [receiver ?? address],
      value: amountWei,
    });
    setLastHash(tx);
    return tx;
  }

  const wait = useWaitForTransactionReceipt({ hash: lastHash });

  return {
    deposit,
    txHash: lastHash ?? hash,
    isPending: isPending || wait.isLoading,
    isSuccess: wait.isSuccess,
    error: error ?? wait.error,
  };
}

export function useWithdrawShares(vault: Address) {
  const { address } = useAccount();
  const {
    writeContractAsync,
    data: hash,
    isPending,
    error,
  } = useWriteContract();
  const [lastHash, setLastHash] = useState<`0x${string}` | undefined>(
    undefined
  );

  async function withdraw(shares: bigint, receiver?: Address) {
    if (!address) throw new Error("Connect wallet first");
    const tx = await writeContractAsync({
      address: vault,
      abi: ABI_INSOMNIA_VAULT,
      functionName: "withdraw",
      args: [shares, (receiver ?? address) as Address],
    });
    setLastHash(tx);
    return tx;
  }

  const wait = useWaitForTransactionReceipt({ hash: lastHash });

  return {
    withdraw,
    txHash: lastHash ?? hash,
    isPending: isPending || wait.isLoading,
    isSuccess: wait.isSuccess,
    error: error ?? wait.error,
  };
}
