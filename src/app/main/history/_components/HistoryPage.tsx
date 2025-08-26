'use client';

import React, { useState, useEffect } from 'react';
import { designTokens } from '@/app/(lib)/designTokens';
import { history } from '@/app/(lib)/mockData';
import Header from './Header';
import FilterPills from './FilterPills';
import StatsRow from './StatsRow';
import TransactionsTable from './TransactionsTable';
import HistoryPageSkeleton from './HistoryPageSkeleton';

export default function HistoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [actionFilter, setActionFilter] =
    useState<'all' | 'deposit' | 'withdraw' | 'claim'>('all');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const filteredHistory = history.filter(
    (item) => actionFilter === 'all' || item.action === actionFilter
  );

  if (isLoading) {
    return <HistoryPageSkeleton />;
  }

  return (
    <div
      className="relative min-h-screen w-full"
      style={{
        backgroundImage: 'url(/Images/Background/vault-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Strong-but-soft overlay so content pops */}
      <div className="pointer-events-none absolute inset-0 bg-white/45 backdrop-blur-xl" />

      <section className="relative z-10 py-12">
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <Header
              title="Transaction History"
              subtitle="Track all your vault interactions and rewards"
              titleColor="#0f172a"
              subtitleColor="#334155"
              titleSize={designTokens.typography.scale.h1}
            />
            <FilterPills value={actionFilter} onChange={setActionFilter} />
          </div>

          <StatsRow filteredHistory={filteredHistory} />

          <TransactionsTable
            filteredHistory={filteredHistory.map(item => ({
              ...item,
              timestamp: typeof item.timestamp === 'object' && 'getTime' in item.timestamp
                ? item.timestamp.getTime()
                : item.timestamp
            }))}
          />
        </div>
      </section>
    </div>
  );
}
