'use client';

import React from 'react';
import Image from 'next/image';
import { designTokens } from '../../(lib)/designTokens';

interface RewardsRowProps {
  logos: string[];
  maxShow?: number;
}

export default function RewardsRow({ logos, maxShow = 4 }: RewardsRowProps) {
  const displayLogos = logos.slice(0, maxShow);
  const remainingCount = logos.length - maxShow;

  return (
    <div>
      <span 
        className="text-sm font-medium"
        style={{ color: designTokens.colors.textSecondary }}
      >
        Rewards from:
      </span>
      <div className="flex items-center space-x-2 mt-1">
        {displayLogos.map((logo, index) => (
          <div
            key={index}
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
        ))}
        
        {remainingCount > 0 && (
          <div
            className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium"
            style={{
              backgroundColor: designTokens.components.statPill.bg,
              color: designTokens.components.statPill.text,
            }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    </div>
  );
}