'use client';

import React from 'react';
import { Wallet, TrendingUp, Shield, FileText } from 'lucide-react';

type TabId = 'overview' | 'strategies' | 'risks' | 'docs';

interface VaultTabsProps {
  activeTab: TabId;
  setActiveTab: (t: TabId) => void;
}

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'overview',   label: 'Overview',   icon: <TrendingUp className="h-4 w-4" /> },
  { id: 'strategies', label: 'Strategies', icon: <Wallet className="h-4 w-4" /> },
  { id: 'risks',      label: 'Risks',      icon: <Shield className="h-4 w-4" /> },
  { id: 'docs',       label: 'Docs',       icon: <FileText className="h-4 w-4" /> },
];

export default function VaultTabs({ activeTab, setActiveTab }: VaultTabsProps) {
  return (
    <div className="mb-8">
      <div className="flex gap-2 overflow-x-auto">
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors"
              style={{
                backgroundColor: active ? '#ec4899' : 'rgba(255,255,255,0.9)',
                color: active ? '#ffffff' : '#334155',
                border: `1px solid ${
                  active ? 'rgba(236,72,153,0.55)' : 'rgba(15,23,42,0.06)'
                }`,
                boxShadow: active ? '0 10px 20px rgba(236,72,153,0.25)' : 'none',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
