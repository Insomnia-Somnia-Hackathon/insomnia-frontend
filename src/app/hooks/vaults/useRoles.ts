"use client";

import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import type { Address } from "viem";
import { keccak256, toBytes } from "viem";
import { useState } from "react";
import { ABI_INSOMNIA_VAULT } from "@/app/constants/abis";

export const PAUSER_ROLE: `0x${string}` = keccak256(toBytes("PAUSER_ROLE"));

export function useHasRole(
  vault: Address,
  role: `0x${string}`,
  account?: Address
) {
  const enabled = !!account;
  const { data, isLoading, error, refetch } = useReadContract({
    address: vault,
    abi: ABI_INSOMNIA_VAULT,
    functionName: "hasRole",
    args: enabled ? [role, account as Address] : undefined,
    query: { enabled },
  });

  return { hasRole: Boolean(data), isLoading, error, refetch };
}

export function useGrantPauserRole(vault: Address) {
  const { address } = useAccount();
  const { writeContractAsync, data, isPending, error } = useWriteContract();
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const wait = useWaitForTransactionReceipt({ hash: txHash });

  async function grant(to?: Address) {
    if (!address) throw new Error("Connect wallet first");
    const target = (to ?? address) as Address;

    const tx = await writeContractAsync({
      address: vault,
      abi: ABI_INSOMNIA_VAULT,
      functionName: "grantRole",
      args: [PAUSER_ROLE, target],
    });
    setTxHash(tx);
    return tx;
  }

  return {
    grant,
    txHash: txHash ?? (data as any),
    isPending: isPending || wait.isLoading,
    isSuccess: wait.isSuccess,
    error: error ?? wait.error,
  };
}
