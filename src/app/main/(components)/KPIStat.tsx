'use client';

import React from 'react';
import { designTokens } from '../../(lib)/designTokens';

interface KPIStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export default function KPIStat({ icon, label, value }: KPIStatProps) {
  return (
    <div
      className="p-6 rounded-2xl backdrop-blur-sm border"
      style={{
        backgroundColor: designTokens.components.card.bg,
        borderColor: designTokens.components.card.border,
        boxShadow: designTokens.effects.shadowSoft,
      }}
    >
      <div className="flex items-center space-x-3">
        <div 
          style={{ color: designTokens.colors.accent }}
          className="flex-shrink-0"
        >
          {icon}
        </div>
        <div>
          <div
            className="text-2xl font-bold"
            style={{ color: designTokens.colors.textPrimary }}
          >
            {value}
          </div>
          <div
            className="text-sm"
            style={{ color: designTokens.colors.textSecondary }}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}