'use client';

import React from 'react';
import { useUserPoints, formatPoints } from '@/app/hooks/usePointController';
import { VAULT_ADDRESSES } from '@/app/constants/vault';
import { Loader2, Sparkles } from 'lucide-react';

interface SimpleTotalPointsDisplayProps {
  vaultKey: keyof typeof VAULT_ADDRESSES;
}

// Enhanced formatting for large numbers
function formatLargeNumber(points: bigint): { formatted: string; suffix: string } {
  const pointsNum = Number(points);
  
  if (pointsNum >= 1e15) {
    return { 
      formatted: (pointsNum / 1e15).toFixed(1), 
      suffix: 'P' // Quadrillion
    };
  } else if (pointsNum >= 1e12) {
    return { 
      formatted: (pointsNum / 1e12).toFixed(1), 
      suffix: 'T' // Trillion
    };
  } else if (pointsNum >= 1e9) {
    return { 
      formatted: (pointsNum / 1e9).toFixed(1), 
      suffix: 'B' // Billion
    };
  } else if (pointsNum >= 1e6) {
    return { 
      formatted: (pointsNum / 1e6).toFixed(1), 
      suffix: 'M' // Million
    };
  } else if (pointsNum >= 1e3) {
    return { 
      formatted: (pointsNum / 1e3).toFixed(1), 
      suffix: 'K' // Thousand
    };
  } else {
    return { 
      formatted: formatPoints(points), 
      suffix: '' 
    };
  }
}

export default function TotalPoints({ vaultKey }: SimpleTotalPointsDisplayProps) {
  const vaultAddress = VAULT_ADDRESSES[vaultKey];
  const { totalPoints, isLoading } = useUserPoints(vaultAddress);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-5 w-5 animate-spin text-slate-600" />
        <span className="ml-2 text-sm text-slate-600">Loading points...</span>
      </div>
    );
  }

  const { formatted, suffix } = formatLargeNumber(totalPoints);

  return (
    <div
      className="p-6 rounded-xl border"
      style={{
        backgroundColor: "rgba(236,72,153,0.05)",
        borderColor: "rgba(236,72,153,0.2)",
      }}
    >
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-pink-500" />
          <span className="text-sm font-medium text-slate-700">
            Total Airdrop Points Earned
          </span>
        </div>
        
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-pink-600">
            {formatted}
          </span>
          {suffix && (
            <span className="text-2xl font-bold text-pink-500">
              {suffix}
            </span>
          )}
        </div>
        
        {/* Full number as subtitle for very large numbers */}
        {suffix && (
          <div className="text-xs text-slate-500 font-mono">
            {formatPoints(totalPoints)} points
          </div>
        )}
      </div>
    </div>
  );
}