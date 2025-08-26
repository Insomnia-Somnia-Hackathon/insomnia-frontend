'use client';

import React from 'react';
import Image from 'next/image';
import { Vault, userVaultRewards } from '@/app/(lib)/mockData';
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
  // Find user rewards for this vault
  const userRewards = userVaultRewards.find(rewards => rewards.vaultSlug === vault.slug);

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

      <Section title="Your Rewards">
        {userRewards ? (
          <div className="space-y-4">
            {/* Total Points */}
            <div 
              className="p-4 rounded-xl border"
              style={{
                backgroundColor: 'rgba(236,72,153,0.05)',
                borderColor: 'rgba(236,72,153,0.2)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Total Points Earned</span>
                <span className="text-2xl font-bold text-pink-600">
                  {userRewards.totalPoints.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Individual Protocol Rewards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userRewards.rewardBalances.map((reward, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border"
                  style={{
                    backgroundColor: 'rgba(15,23,42,0.02)',
                    borderColor: 'rgba(15,23,42,0.06)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border" style={{ borderColor: 'rgba(15,23,42,0.06)' }}>
                      <Image
                        src={reward.protocolLogo}
                        alt={reward.protocolName}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 text-sm">{reward.protocolName}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-slate-800">
                          {reward.points.toLocaleString()}
                        </span>
                        <span 
                          className="text-xs font-semibold px-2 py-1 rounded-full"
                          style={{
                            color: '#ec4899',
                            backgroundColor: 'rgba(236,72,153,0.1)',
                          }}
                        >
                          {reward.multiplier}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div 
            className="p-6 rounded-xl border text-center"
            style={{
              backgroundColor: 'rgba(15,23,42,0.02)',
              borderColor: 'rgba(15,23,42,0.06)',
            }}
          >
            <p className="text-slate-600">No rewards earned yet. Make a deposit to start earning points!</p>
          </div>
        )}
      </Section>

      <Section title="Rewards from">
        <RewardsRow logos={vault.rewardsLogos} multipliers={vault.rewardsMultipliers} />
      </Section>

      <Section title="Withdrawal Time">
        <p className="text-slate-600">
          {vault.withdrawalTime} — Funds are locked to optimize yield strategies.
        </p>
      </Section>
    </div>
  );
}
