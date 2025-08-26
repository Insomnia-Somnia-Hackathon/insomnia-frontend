'use client';

import React from 'react';
import { Vault } from '@/app/(lib)/mockData';
import RewardsRow from '@/app/main/(components)/RewardsRow';
import { Section } from './helper';

type TabId = 'overview' | 'strategies' | 'risks' | 'docs';

interface VaultTabContentProps {
  vault: Vault;
  activeTab: TabId;
}

export default function VaultTabContent({ vault, activeTab }: VaultTabContentProps) {
  return (
    <div
      className="rounded-2xl border shadow-sm p-6 sm:p-8"
      style={{
        backgroundColor: 'rgba(255,255,255,0.92)',
        borderColor: 'rgba(15,23,42,0.06)',
      }}
    >
      {activeTab === 'overview' && <OverviewTab vault={vault} />}

      {activeTab === 'strategies' && (
        <div className="space-y-4">
          {vault.strategies.map((strategy, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border"
              style={{
                backgroundColor: 'rgba(15,23,42,0.03)',
                borderColor: 'rgba(15,23,42,0.06)',
              }}
            >
              <div className="font-medium text-slate-900">{strategy}</div>
              <div className="text-sm text-slate-600 mt-1">
                Automated strategy optimized for maximum point accumulation.
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'risks' && (
        <div className="space-y-4">
          <div
            className="p-4 rounded-xl border"
            style={{
              backgroundColor: 'rgba(15,23,42,0.03)',
              borderColor: 'rgba(15,23,42,0.06)',
            }}
          >
            <p className="text-slate-600">
              This vault carries {vault.risk.toLowerCase()} risk due to its strategy
              composition and protocol exposure. Always assess your risk tolerance before
              depositing.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'docs' && (
        <div className="text-slate-600">
          Detailed documentation, audit reports, and technical specifications would be
          available here.
        </div>
      )}
    </div>
  );
}

function OverviewTab({ vault }: { vault: Vault }) {
  return (
    <div className="space-y-8">
      <Section title="Accepted Assets">
        <div className="flex flex-wrap gap-2">
          {vault.acceptedAssets.map((asset) => (
            <span
              key={asset}
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: 'rgba(15,23,42,0.05)',
                color: '#0f172a',
                border: '1px solid rgba(15,23,42,0.06)',
              }}
            >
              {asset}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Rewards from">
        <RewardsRow logos={vault.rewardsLogos} />
      </Section>

      <Section title="Withdrawal Time">
        <p className="text-slate-600">
          {vault.withdrawalTime} — Funds are locked to optimize yield strategies.
        </p>
      </Section>
    </div>
  );
}
