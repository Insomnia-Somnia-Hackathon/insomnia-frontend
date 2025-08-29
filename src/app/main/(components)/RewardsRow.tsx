'use client';

import React from 'react';
import Image from 'next/image';
import { designTokens } from '../../(lib)/designTokens';

interface RewardsRowProps {
  logos: string[];
  multipliers: string[];
  maxShow?: number;
}

export default function RewardsRow({ logos, multipliers, maxShow = 4,}: RewardsRowProps) {
  const displayLogos = logos.slice(0, maxShow);
  const displayMultipliers = multipliers.slice(0, maxShow);
  const remainingCount = logos.length - maxShow;

  return (
    <div>
      <span 
        className="text-sm font-medium"
        style={{ color: designTokens.colors.textSecondary }}
      >
        Airdrop Points Rewards:
      </span>
      <div className="flex items-start space-x-2 mt-1">
        {displayLogos.map((logo, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-1"
          >
            <div
              className="relative h-6 w-6 rounded-full overflow-hidden border"
              style={{ borderColor: designTokens.colors.border }}
            >
              <Image
                src={logo}
                alt={`Protocol ${index + 1}`}
                fill
                className="object-cover"
                sizes="24px"
              />
            </div>
            <span 
              className="text-xs font-semibold px-1 py-0.5 rounded-full"
              style={{
                color: '#ec4899',
                backgroundColor: 'rgba(236,72,153,0.1)',
                fontSize: '10px',
                lineHeight: '1'
              }}
            >
              {displayMultipliers[index]}
            </span>
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div className="flex flex-col items-center space-y-1">
            <div
              className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium"
              style={{
                backgroundColor: designTokens.components.statPill.bg,
                color: designTokens.components.statPill.text,
              }}
            >
              +{remainingCount}
            </div>
            <span 
              className="text-xs font-semibold px-1 py-0.5 rounded-full"
              style={{
                color: '#ec4899',
                backgroundColor: 'rgba(236,72,153,0.1)',
                fontSize: '10px',
                lineHeight: '1'
              }}
            >
              ...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}