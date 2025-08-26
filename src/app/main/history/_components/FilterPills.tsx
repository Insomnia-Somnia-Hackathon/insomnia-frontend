'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { designTokens } from '@/app/(lib)/designTokens';

export default function FilterPills({
  value,
  onChange,
}: {
  value: 'all' | 'deposit' | 'withdraw' | 'claim';
  onChange: (v: 'all' | 'deposit' | 'withdraw' | 'claim') => void;
}) {
  const items = ['all', 'deposit', 'withdraw', 'claim'] as const;

  return (
    <div className="flex items-center gap-2">
      {items.map((f) => {
        const active = value === f;
        return (
          <Button
            key={f}
            size="sm"
            onClick={() => onChange(f)}
            className={`rounded-full px-4 capitalize ${active ? 'shadow-md' : 'border'}`}
            style={
              active
                ? {
                    backgroundColor: designTokens.colors.accent,
                    color: '#ffffff',
                  }
                : {
                    backgroundColor: 'rgba(255,255,255,0.70)',
                    color: '#0f172a',
                    borderColor: 'rgba(15,23,42,0.08)',
                    backdropFilter: 'blur(8px)',
                  }
            }
          >
            {f}
          </Button>
        );
      })}
    </div>
  );
}
