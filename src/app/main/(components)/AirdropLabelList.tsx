'use client';

import React from 'react';
import Image from 'next/image';

export type RewardLabelItem = {
  logo: string;
  name: string;        // protocolName
  multiplier?: string; // "2x", "1.5x", dsb (opsional)
};

interface RewardLabelsProps {
  items: RewardLabelItem[];
  maxShow?: number;    // opsional: batasi tampilan
}

export default function RewardLabels({ items, maxShow }: RewardLabelsProps) {
  const display = typeof maxShow === 'number' ? items.slice(0, maxShow) : items;
  const remaining = typeof maxShow === 'number' ? Math.max(items.length - maxShow, 0) : 0;

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2">
      {display.map((it, i) => (
        <div
          key={i}
          className="inline-flex items-center gap-2 rounded-full border px-2 py-1"
          style={{ borderColor: 'rgba(15,23,42,0.06)', backgroundColor: 'rgba(15,23,42,0.03)' }}
        >
          <Image src={it.logo} alt={`${it.name} logo`} width={16} height={16} className="rounded-full" />
          <span className="text-xs font-medium whitespace-nowrap">{it.name}</span>
          {it.multiplier && (
            <span
              className="rounded-full px-1 py-0.5 text-[10px] font-semibold"
              style={{ color: '#ec4899', backgroundColor: 'rgba(236,72,153,0.12)', lineHeight: 1 }}
            >
              {it.multiplier}
            </span>
          )}
        </div>
      ))}

      {remaining > 0 && (
        <div
          className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium"
          style={{ borderColor: 'rgba(15,23,42,0.06)', backgroundColor: 'rgba(15,23,42,0.03)' }}
        >
          +{remaining} more
        </div>
      )}
    </div>
  );
}
