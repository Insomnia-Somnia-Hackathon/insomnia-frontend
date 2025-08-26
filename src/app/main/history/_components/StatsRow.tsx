import React from 'react';
import GlassStat from './GlassStat';
import { formatCurrency } from '@/app/(lib)/utils';

export default function StatsRow({
  filteredHistory,
}: {
  filteredHistory: {
    action: 'deposit' | 'withdraw' | 'claim';
    amountUSD: number;
  }[];
}) {
  const deposited = filteredHistory
    .filter((h) => h.action === 'deposit')
    .reduce((s, h) => s + h.amountUSD, 0);

  const withdrawn = filteredHistory
    .filter((h) => h.action === 'withdraw')
    .reduce((s, h) => s + h.amountUSD, 0);

  const claimed = filteredHistory
    .filter((h) => h.action === 'claim')
    .reduce((s, h) => s + h.amountUSD, 0);

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
      <GlassStat title="Total Transactions" value={String(filteredHistory.length)} accent="#ec4899" />
      <GlassStat title="Total Deposited" value={formatCurrency(deposited)} accent="#059669" />
      <GlassStat title="Total Withdrawn" value={formatCurrency(withdrawn)} accent="#d97706" />
      <GlassStat title="Total Claimed" value={formatCurrency(claimed)} accent="#0ea5e9" />
    </div>
  );
}
