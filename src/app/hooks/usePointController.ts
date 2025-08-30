'use client';

import { useReadContract, useAccount } from 'wagmi';
import { ABI_INSOMNIA_POINT_CONTROLLER, ABI_INSOMNIA_VAULT } from '@/app/constants/abis';
import { VAULT_ADDRESSES } from '@/app/constants/vault';
import { useMemo } from 'react';

const POINT_CONTROLLER_ADDRESS = '0x185427782C214f1455180bf6f1E47Cd52E9096d6';

// Source labels mapping
const SOURCE_LABELS: Record<string, string> = {
  'DEPOSIT': 'DEPOSIT',
  'BOOST': 'BOOST',
  'REFERRAL': 'REFERRAL',
  'STAKING': 'STAKING',
};

// Convert bytes32 to string
const bytes32ToString = (bytes32: string): string => {
  try {
    const hex = bytes32.replace('0x', '');
    const str = Buffer.from(hex, 'hex').toString('utf8').replace(/\0/g, '');
    return str || bytes32.slice(0, 10) + '...';
  } catch {
    return bytes32.slice(0, 10) + '...';
  }
};

// Get human readable label
const getSourceLabel = (source: string): string => {
  const sourceStr = bytes32ToString(source);
  return SOURCE_LABELS[sourceStr] || sourceStr;
};

// Hook to get total points and breakdown
export function useUserPoints(vaultAddress: string) {
  const { address } = useAccount();

  const { data: previewData, isLoading: isPreviewLoading } = useReadContract({
    address: POINT_CONTROLLER_ADDRESS as `0x${string}`,
    abi: ABI_INSOMNIA_POINT_CONTROLLER,
    functionName: 'preview',
    args: [vaultAddress as `0x${string}`, address as `0x${string}`],
    query: {
      enabled: !!address && !!vaultAddress,
      refetchInterval: 30000, // Refresh every 30 seconds
    },
  });

  const { data: userBalance } = useReadContract({
    address: vaultAddress as `0x${string}`,
    abi: ABI_INSOMNIA_VAULT,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && !!vaultAddress,
    },
  });

  return useMemo(() => {
    if (!previewData || !Array.isArray(previewData) || previewData.length < 3) {
      return {
        totalPoints: BigInt(0),
        sources: [],
        isLoading: isPreviewLoading,
        userBalance: userBalance || BigInt(0),
      };
    }

    const [total, srcs, perSource] = previewData;
    const sources = srcs?.map((src: string, index: number) => ({
      source: src,
      label: getSourceLabel(src),
      points: perSource?.[index] || BigInt(0),
    })) || [];

    return {
      totalPoints: total || BigInt(0),
      sources,
      isLoading: isPreviewLoading,
      userBalance: userBalance || BigInt(0),
    };
  }, [previewData, isPreviewLoading, userBalance]);
}

// Hook to get pending points calculation for a specific source
export function usePendingPoints(vaultAddress: string, source: string) {
  const { address } = useAccount();

  const { data: sourceData } = useReadContract({
    address: POINT_CONTROLLER_ADDRESS as `0x${string}`,
    abi: ABI_INSOMNIA_POINT_CONTROLLER,
    functionName: 'sourceData',
    args: [vaultAddress as `0x${string}`, source as `0x${string}`],
    query: {
      enabled: !!address && !!vaultAddress && !!source,
      refetchInterval: 10000, // More frequent for real-time updates
    },
  });

  const { data: userIndex } = useReadContract({
    address: POINT_CONTROLLER_ADDRESS as `0x${string}`,
    abi: ABI_INSOMNIA_POINT_CONTROLLER,
    functionName: 'userIndex',
    args: [vaultAddress as `0x${string}`, address as `0x${string}`, source as `0x${string}`],
    query: {
      enabled: !!address && !!vaultAddress && !!source,
    },
  });

  const { data: userBalance } = useReadContract({
    address: vaultAddress as `0x${string}`,
    abi: ABI_INSOMNIA_VAULT,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && !!vaultAddress,
    },
  });

  return useMemo(() => {
    if (!sourceData || !userIndex || !userBalance) return BigInt(0);
    if (!Array.isArray(sourceData)) return BigInt(0);

    const [globalIndex] = sourceData;
    const shares = userBalance as bigint;
    const userIdx = userIndex as bigint;

    if (typeof globalIndex !== 'bigint' || typeof userIdx !== 'bigint' || typeof shares !== 'bigint') {
      return BigInt(0);
    }

    // Calculate pending: shares * (globalIndex - userIndex) / 1e18
    const indexDiff = globalIndex - userIdx;
    const pending = (shares * indexDiff) / BigInt(1e18);

    return pending > BigInt(0) ? pending : BigInt(0);
  }, [sourceData, userIndex, userBalance]);
}

// Hook to get earning rate per source
export function useEarningRate(vaultAddress: string, source: string) {
  const { data: sourceData } = useReadContract({
    address: POINT_CONTROLLER_ADDRESS as `0x${string}`,
    abi: ABI_INSOMNIA_POINT_CONTROLLER,
    functionName: 'sourceData',
    args: [vaultAddress as `0x${string}`, source as `0x${string}`],
    query: {
      enabled: !!vaultAddress && !!source,
    },
  });

  const { data: totalSupply } = useReadContract({
    address: vaultAddress as `0x${string}`,
    abi: ABI_INSOMNIA_VAULT,
    functionName: 'totalSupply',
    query: {
      enabled: !!vaultAddress,
    },
  });

  const { data: totalAssets } = useReadContract({
    address: vaultAddress as `0x${string}`,
    abi: ABI_INSOMNIA_VAULT,
    functionName: 'totalAssets',
    query: {
      enabled: !!vaultAddress,
    },
  });

  return useMemo(() => {
    if (!sourceData || !totalSupply || !totalAssets) return null;
    if (!Array.isArray(sourceData)) return null;

    const [, lastUpdated, baseRatePerSec, multiplier] = sourceData;

    if (typeof baseRatePerSec !== 'bigint' || typeof multiplier !== 'bigint' || 
        typeof totalSupply !== 'bigint' || typeof totalAssets !== 'bigint') {
      return null;
    }

    // Calculate points per day per share
    const pointsPerDayPerShare = (baseRatePerSec * multiplier * BigInt(86400)) / BigInt(1e18);

    // Calculate shares per ETH for conversion
    const sharesPerETH = totalSupply && totalAssets ? (totalSupply * BigInt(1e18)) / totalAssets : BigInt(1);

    return {
      pointsPerDayPerShare,
      sharesPerETH,
      multiplier,
      lastUpdated: Number(lastUpdated),
      isBootsted: multiplier > BigInt(1e18), // 1e18 = 1x
    };
  }, [sourceData, totalSupply, totalAssets]);
}

// Hook to get all points for all vaults
export function useAllVaultsPoints() {
  const { address } = useAccount();

  const { data: vault1Preview, isLoading: isVault1Loading } = useReadContract({
    address: POINT_CONTROLLER_ADDRESS as `0x${string}`,
    abi: ABI_INSOMNIA_POINT_CONTROLLER,
    functionName: 'preview',
    args: [VAULT_ADDRESSES.vault1 as `0x${string}`, address as `0x${string}`],
    query: {
      enabled: !!address,
      refetchInterval: 30000,
    },
  });

  const { data: vault2Preview, isLoading: isVault2Loading } = useReadContract({
    address: POINT_CONTROLLER_ADDRESS as `0x${string}`,
    abi: ABI_INSOMNIA_POINT_CONTROLLER,
    functionName: 'preview',
    args: [VAULT_ADDRESSES.vault2 as `0x${string}`, address as `0x${string}`],
    query: {
      enabled: !!address,
      refetchInterval: 30000,
    },
  });

  const { data: vault3Preview, isLoading: isVault3Loading } = useReadContract({
    address: POINT_CONTROLLER_ADDRESS as `0x${string}`,
    abi: ABI_INSOMNIA_POINT_CONTROLLER,
    functionName: 'preview',
    args: [VAULT_ADDRESSES.vault3 as `0x${string}`, address as `0x${string}`],
    query: {
      enabled: !!address,
      refetchInterval: 30000,
    },
  });

  return useMemo(() => {
    // Type-safe extraction with proper checks
    const vault1Points = (Array.isArray(vault1Preview) && vault1Preview[0]) ? vault1Preview[0] : BigInt(0);
    const vault2Points = (Array.isArray(vault2Preview) && vault2Preview[0]) ? vault2Preview[0] : BigInt(0);
    const vault3Points = (Array.isArray(vault3Preview) && vault3Preview[0]) ? vault3Preview[0] : BigInt(0);
    
    const vault1Sources = (Array.isArray(vault1Preview) && Array.isArray(vault1Preview[1])) 
      ? vault1Preview[1].map((src: string, index: number) => ({
          source: src,
          label: getSourceLabel(src),
          points: (Array.isArray(vault1Preview[2]) && vault1Preview[2][index]) ? vault1Preview[2][index] : BigInt(0),
        }))
      : [];

    const vault2Sources = (Array.isArray(vault2Preview) && Array.isArray(vault2Preview[1]))
      ? vault2Preview[1].map((src: string, index: number) => ({
          source: src,
          label: getSourceLabel(src),
          points: (Array.isArray(vault2Preview[2]) && vault2Preview[2][index]) ? vault2Preview[2][index] : BigInt(0),
        }))
      : [];

    const vault3Sources = (Array.isArray(vault3Preview) && Array.isArray(vault3Preview[1]))
      ? vault3Preview[1].map((src: string, index: number) => ({
          source: src,
          label: getSourceLabel(src),
          points: (Array.isArray(vault3Preview[2]) && vault3Preview[2][index]) ? vault3Preview[2][index] : BigInt(0),
        }))
      : [];

    const totalPointsAllVaults = vault1Points + vault2Points + vault3Points;
    
    return {
      vault1: {
        totalPoints: vault1Points,
        sources: vault1Sources,
        isLoading: isVault1Loading,
        userBalance: BigInt(0),
      },
      vault2: {
        totalPoints: vault2Points,
        sources: vault2Sources,
        isLoading: isVault2Loading,
        userBalance: BigInt(0),
      },
      vault3: {
        totalPoints: vault3Points,
        sources: vault3Sources,
        isLoading: isVault3Loading,
        userBalance: BigInt(0),
      },
      totalPointsAllVaults,
      isLoading: isVault1Loading || isVault2Loading || isVault3Loading,
    };
  }, [vault1Preview, vault2Preview, vault3Preview, isVault1Loading, isVault2Loading, isVault3Loading]);
}

// Utility to format points with commas
export function formatPoints(points: bigint): string {
  const pointsStr = points.toString();
  return pointsStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Utility to format time ago
export function formatTimeAgo(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// Utility to get vault key by address
export function getVaultKeyByAddress(address: string): keyof typeof VAULT_ADDRESSES | null {
  const normalizedAddress = address.toLowerCase();
  
  if (normalizedAddress === VAULT_ADDRESSES.vault1.toLowerCase()) return 'vault1';
  if (normalizedAddress === VAULT_ADDRESSES.vault2.toLowerCase()) return 'vault2';
  if (normalizedAddress === VAULT_ADDRESSES.vault3.toLowerCase()) return 'vault3';
  
  return null;
}