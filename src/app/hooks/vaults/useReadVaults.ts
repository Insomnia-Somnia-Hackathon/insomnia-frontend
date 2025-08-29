"use client";

import { useAccount, useReadContract, useReadContracts } from "wagmi";
import type { Address } from "viem";
import { formatEther } from "viem";
import { ABI_INSOMNIA_VAULT } from "@/app/constants/abis";

export function useVaultStatic(vault: Address) {
  const { data } = useReadContracts({
    allowFailure: false,
    contracts: [
      { address: vault, abi: ABI_INSOMNIA_VAULT, functionName: "name" },
      { address: vault, abi: ABI_INSOMNIA_VAULT, functionName: "symbol" },
      {
        address: vault,
        abi: ABI_INSOMNIA_VAULT,
        functionName: "LOCKUP_SECONDS",
      },
    ],
  });
  const [name, symbol, lockupSeconds] = (data ?? []) as [
    string,
    string,
    bigint
  ];
  return { name, symbol, lockupSeconds };
}

export function useVaultDynamic(vault: Address) {
  const { data } = useReadContracts({
    allowFailure: false,
    contracts: [
      { address: vault, abi: ABI_INSOMNIA_VAULT, functionName: "totalAssets" },
      { address: vault, abi: ABI_INSOMNIA_VAULT, functionName: "totalSupply" },
      { address: vault, abi: ABI_INSOMNIA_VAULT, functionName: "paused" },
    ],
  });
  const [totalAssets, totalSupply, paused] = (data ?? []) as [
    bigint,
    bigint,
    boolean
  ];
  return { totalAssets, totalSupply, paused };
}

export function useVaultUserBalances(vault: Address, user?: Address) {
  const enabled = !!user;
  const { data } = useReadContract({
    address: vault,
    abi: ABI_INSOMNIA_VAULT,
    functionName: "balanceOf",
    args: user ? [user] : undefined,
    query: { enabled },
  });
  const shares = (data ?? BigInt(0)) as bigint;
  return { shares };
}

export function usePreviewWithdraw(vault: Address, shares?: bigint) {
  const enabled = shares !== undefined;
  const { data, isLoading, refetch } = useReadContract({
    address: vault,
    abi: ABI_INSOMNIA_VAULT,
    functionName: "previewWithdraw",
    args: shares !== undefined ? [shares] : undefined,
    query: { enabled },
  });
  return { assetsOut: (data ?? BigInt(0)) as bigint, isLoading, refetch };
}

export const fEth = (v?: bigint) =>
  v === undefined ? "-" : Number.parseFloat(formatEther(v)).toLocaleString();

export const formatLock = (seconds?: bigint) => {
  if (!seconds) return "-";
  const s = Number(seconds);
  if (s % 86400 === 0) return `${s / 86400} days`;
  if (s % 3600 === 0) return `${s / 3600} hours`;
  if (s % 60 === 0) return `${s / 60} minutes`;
  return `${s} sec`;
};

export const formatCountdown = (ts?: bigint) => {
  if (!ts) return "-";
  const now = Math.floor(Date.now() / 1000);
  const target = Number(ts);
  const remain = Math.max(target - now, 0);
  if (remain === 0) return "Unlocked";
  const d = Math.floor(remain / 86400);
  const h = Math.floor((remain % 86400) / 3600);
  const m = Math.floor((remain % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
};

export function useVaultWithdrawInfo(vault: Address) {
  const { address: user } = useAccount();
  const { data: statics } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: vault,
        abi: ABI_INSOMNIA_VAULT,
        functionName: "LOCKUP_SECONDS",
      },
      {
        address: vault,
        abi: ABI_INSOMNIA_VAULT,
        functionName: "EARLY_EXIT_FEE_BPS",
      },
    ],
  });
  const [lockupSeconds, earlyExitFeeBps] = (statics ?? []) as [bigint, bigint];

  const { data: unlockAt } = useReadContract({
    address: vault,
    abi: ABI_INSOMNIA_VAULT,
    functionName: "unlockAt",
    args: user ? [user] : undefined,
    query: { enabled: !!user },
  });

  const unlockAtBn = (unlockAt ?? BigInt(0)) as bigint;
  const now = BigInt(Math.floor(Date.now() / 1000));
  const isLocked = unlockAtBn > now;

  const earlyExitFeePct = earlyExitFeeBps ? Number(earlyExitFeeBps) / 100 : 0;

  return {
    lockupSeconds,
    earlyExitFeeBps,
    earlyExitFeePct,
    unlockAt: unlockAtBn,
    isLocked,
    unlockCountdown: formatCountdown(unlockAtBn),
  };
}
