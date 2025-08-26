'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ArrowLeft, Wallet, TrendingUp, Shield, FileText } from 'lucide-react';
import { designTokens } from '../../(lib)/designTokens';
import { formatCurrency, formatPercent, getRiskColor } from '../../(lib)/utils';
import { Vault } from '../../(lib)/mockData';
import RewardsRow from './RewardsRow';

interface VaultDetailsProps {
  vault: Vault;
}

export default function VaultDetails({ vault }: VaultDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'strategies' | 'risks' | 'docs'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'strategies', label: 'Strategies', icon: <Wallet className="h-4 w-4" /> },
    { id: 'risks', label: 'Risks', icon: <Shield className="h-4 w-4" /> },
    { id: 'docs', label: 'Docs', icon: <FileText className="h-4 w-4" /> },
  ] as const;

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: 'url(/Images/Background/vault-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Lebih terang & bersih supaya konten kontras */}
      <div className="absolute inset-0 bg-white/45 backdrop-blur-sm z-0" />

      <section className="relative z-10 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/main/vaults" className="inline-flex items-center gap-2 text-rose-500 hover:opacity-80">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Vaults</span>
            </Link>
          </div>

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Info singkat */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4">
                <div
                  className="size-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(236,72,153,0.12)', color: '#ec4899' }}
                >
                  <TrendingUp className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{vault.name}</h1>

                  <div className="mt-2 flex items-center gap-2">
                    <Badge className={cnBadge(getRiskColor(vault.risk))}>{vault.risk} Risk</Badge>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/75 text-slate-700 border border-white/60 backdrop-blur">
                      Somnia Network
                    </span>
                  </div>

                  <p className="mt-4 text-slate-700 leading-relaxed">
                    {vault.description}
                  </p>
                </div>
              </div>
            </div>

            {/* KPI ringkas (glass white) */}
            <div
              className="p-6 rounded-2xl border shadow-sm"
              style={{
                backgroundColor: 'rgba(255,255,255,0.85)',
                borderColor: 'rgba(15,23,42,0.06)',
                backdropFilter: `blur(${designTokens.effects.blurGlass})`,
              }}
            >
              <div className="space-y-5">
                <Kpi label="Est. Points APR" value={formatPercent(vault.estPointsAPR)} highlight />
                <Kpi label="Total Value Locked" value={formatCurrency(vault.tvlUSD)} />
                <Kpi label="Your Balance" value="$0.00" muted />

                <div className="pt-2 space-y-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full font-medium rounded-full"
                        style={{
                          backgroundColor: '#ec4899',
                          color: '#fff',
                          boxShadow: '0 10px 22px rgba(236,72,153,0.35)',
                        }}
                      >
                        Deposit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Deposit to {vault.name}</DialogTitle>
                      </DialogHeader>
                      <div className="py-4 text-slate-600">
                        Deposit flow with wallet integration goes here.
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full font-medium rounded-full"
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#ec4899',
                          borderColor: 'rgba(236,72,153,0.45)',
                        }}
                      >
                        Withdraw
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Withdraw from {vault.name}</DialogTitle>
                      </DialogHeader>
                      <div className="py-4 text-slate-600">
                        Withdrawal flow goes here.
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs jadi pill minimal */}
          <div className="mb-8">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors"
                    style={{
                      backgroundColor: active ? '#ec4899' : 'rgba(255,255,255,0.9)',
                      color: active ? '#ffffff' : '#334155',
                      border: `1px solid ${active ? 'rgba(236,72,153,0.55)' : 'rgba(15,23,42,0.06)'}`,
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

          {/* Content section — 1 kartu glass-white supaya kontras */}
          <div
            className="rounded-2xl border shadow-sm p-6 sm:p-8"
            style={{
              backgroundColor: 'rgba(255,255,255,0.92)',
              borderColor: 'rgba(15,23,42,0.06)',
            }}
          >
            {activeTab === 'overview' && (
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
            )}

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
                  <div className="mb-2">
                    <Badge className={getRiskColor(vault.risk)}>{vault.risk} Risk</Badge>
                  </div>
                  <p className="text-slate-600">
                    This vault carries {vault.risk.toLowerCase()} risk due to its strategy
                    composition and protocol exposure. Always assess your risk tolerance
                    before depositing.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'docs' && (
              <div className="text-slate-600">
                Detailed documentation, audit reports, and technical specifications would
                be available here.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- small helpers ---------- */

function Kpi({
  label,
  value,
  highlight,
  muted,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <div>
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div
        className={highlight ? 'text-3xl font-extrabold' : 'text-lg font-semibold'}
        style={{ color: highlight ? '#10b981' : muted ? '#64748b' : '#0f172a' }}
      >
        {value}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
      {children}
    </div>
  );
}

function cnBadge(input: string) {
  // menjaga compatibility dengan className shadcn, tambah rounded-full agar lebih minimal
  return input + ' rounded-full';
}
