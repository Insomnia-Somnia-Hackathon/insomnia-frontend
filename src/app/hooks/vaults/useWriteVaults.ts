"use client";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  usePublicClient,
} from "wagmi";
import { ABI_INSOMNIA_VAULT } from "@/app/constants/abis";
import type { Address } from "viem";
import React, { useMemo, useState, useEffect, useCallback } from "react";

// helper: estimate gas with padding & sane floor
async function paddedGas(publicClient: any, req: any) {
  try {
    const est: bigint = await publicClient.estimateContractGas(req);
    const padded = (est * BigInt(12)) / BigInt(10); // +20%
    return padded < BigInt(21000) ? BigInt(300000) : padded; // floor to 300k
  } catch {
    return BigInt(300000); // fallback
  }
}

export function useDepositNative(vault: Address) {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const {
    writeContractAsync,
    data: hash,
    isPending,
    error,
  } = useWriteContract();
  const [lastHash, setLastHash] = useState<`0x${string}` | undefined>();

  async function deposit(amountWei: bigint, receiver?: Address) {
    if (!address) throw new Error("Connect wallet first");

    const gas = await paddedGas(publicClient, {
      account: address,
      address: vault,
      abi: ABI_INSOMNIA_VAULT,
      functionName: "depositNative",
      args: [receiver ?? address],
      value: amountWei,
    });

    // (optional) estimate EIP-1559 fees
    const fees = publicClient
      ? await publicClient.estimateFeesPerGas().catch(() => undefined)
      : undefined;

    const tx = await writeContractAsync({
      address: vault,
      abi: ABI_INSOMNIA_VAULT,
      functionName: "depositNative",
      args: [receiver ?? address],
      value: amountWei,
      gas,
      ...(fees && {
        maxFeePerGas: fees.maxFeePerGas,
        maxPriorityFeePerGas: fees.maxPriorityFeePerGas,
      }),
    });
    setLastHash(tx);
    return tx;
  }

  const wait = useWaitForTransactionReceipt({ hash: lastHash });
  const reset = useCallback(() => {
    setLastHash(undefined);
  }, []);

  return {
    deposit,
    txHash: lastHash ?? hash,
    isPending: isPending || wait.isLoading,
    isSuccess: wait.isSuccess,
    error: error ?? wait.error,
    reset,
  };
}

export function useWithdrawShares(vault: Address) {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const {
    writeContractAsync,
    data: hash,
    isPending,
    error,
  } = useWriteContract();
  const [lastHash, setLastHash] = useState<`0x${string}` | undefined>();

  async function withdraw(shares: bigint, receiver?: Address) {
    if (!address) throw new Error("Connect wallet first");

    const gas = await paddedGas(publicClient, {
      account: address,
      address: vault,
      abi: ABI_INSOMNIA_VAULT,
      functionName: "withdraw",
      args: [shares, (receiver ?? address) as Address],
    });

    const fees = publicClient
      ? await publicClient.estimateFeesPerGas().catch(() => undefined)
      : undefined;

    const tx = await writeContractAsync({
      address: vault,
      abi: ABI_INSOMNIA_VAULT,
      functionName: "withdraw",
      args: [shares, (receiver ?? address) as Address],
      gas,
      ...(fees && {
        maxFeePerGas: fees.maxFeePerGas,
        maxPriorityFeePerGas: fees.maxPriorityFeePerGas,
      }),
    });
    setLastHash(tx);
    return tx;
  }

  const wait = useWaitForTransactionReceipt({ hash: lastHash });
  const reset = useCallback(() => {
    setLastHash(undefined);
  }, []);
  return {
    withdraw,
    txHash: lastHash ?? hash,
    isPending: isPending || wait.isLoading,
    isSuccess: wait.isSuccess,
    error: error ?? wait.error,
    reset,
  };
}
