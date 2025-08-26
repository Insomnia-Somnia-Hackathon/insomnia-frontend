'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Filter } from 'lucide-react';
import { designTokens } from '../../(lib)/designTokens';
import { formatCurrency, formatDate, shortenHash } from '../../(lib)/utils';
import { history, vaults } from '../../(lib)/mockData';

export default function HistoryTable() {
  const [actionFilter, setActionFilter] = useState<'all' | 'deposit' | 'withdraw' | 'claim'>('all');
  
  const filteredHistory = history.filter(item => 
    actionFilter === 'all' || item.action === actionFilter
  );

  const getActionColor = (action: string) => {
    switch (action) {
      case 'deposit':
        return 'bg-green-400/10 text-green-400';
      case 'withdraw':
        return 'bg-red-400/10 text-red-400';
      case 'claim':
        return 'bg-blue-400/10 text-blue-400';
      default:
        return 'bg-gray-400/10 text-gray-400';
    }
  };

  const getVaultName = (slug: string) => {
    return vaults.find(vault => vault.slug === slug)?.name || slug;
  };

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
    <section className="relative z-10 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="font-bold mb-2"
              style={{
                fontSize: designTokens.typography.scale.h1,
                color: designTokens.colors.textPrimary,
                fontWeight: designTokens.typography.weights.bold,
              }}
            >
              Transaction History
            </h1>
            <p
              style={{
                color: designTokens.colors.textSecondary,
                fontSize: designTokens.typography.scale.body,
              }}
            >
              Track all your vault interactions and rewards
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-2">
            {['all', 'deposit', 'withdraw', 'claim'].map((filter) => (
              <Button
                key={filter}
                variant={actionFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActionFilter(filter as any)}
                className="capitalize"
                style={actionFilter === filter ? {
                  backgroundColor: designTokens.colors.accent,
                  color: designTokens.colors.background,
                } : {
                  backgroundColor: designTokens.components.button.secondary.bg,
                  color: designTokens.components.button.secondary.text,
                  borderColor: designTokens.colors.border,
                }}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="relative p-4 rounded-xl border bg-[#fefcff]">
            {/* Dreamy Sky Pink Glow */}
            <div
              className="absolute inset-0 z-0 rounded-xl"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                  radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
              }}
            />
            <div className="relative z-10">
            <div
              className="text-xl font-bold"
              style={{ color: designTokens.colors.accent }}
            >
              {filteredHistory.length}
            </div>
            <div
              className="text-sm"
              style={{ color: designTokens.colors.textSecondary }}
            >
              Total Transactions
            </div>
            </div>
          </div>

          <div className="relative p-4 rounded-xl border bg-[#fefcff]">
            {/* Dreamy Sky Pink Glow */}
            <div
              className="absolute inset-0 z-0 rounded-xl"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                  radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
              }}
            />
            <div className="relative z-10">
            <div
              className="text-xl font-bold"
              style={{ color: designTokens.colors.success }}
            >
              {formatCurrency(
                filteredHistory
                  .filter(h => h.action === 'deposit')
                  .reduce((sum, h) => sum + h.amountUSD, 0)
              )}
            </div>
            <div
              className="text-sm"
              style={{ color: designTokens.colors.textSecondary }}
            >
              Total Deposited
            </div>
            </div>
          </div>

          <div className="relative p-4 rounded-xl border bg-[#fefcff]">
            {/* Dreamy Sky Pink Glow */}
            <div
              className="absolute inset-0 z-0 rounded-xl"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                  radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
              }}
            />
            <div className="relative z-10">
            <div
              className="text-xl font-bold"
              style={{ color: designTokens.colors.warning }}
            >
              {formatCurrency(
                filteredHistory
                  .filter(h => h.action === 'withdraw')
                  .reduce((sum, h) => sum + h.amountUSD, 0)
              )}
            </div>
            <div
              className="text-sm"
              style={{ color: designTokens.colors.textSecondary }}
            >
              Total Withdrawn
            </div>
            </div>
          </div>

          <div className="relative p-4 rounded-xl border bg-[#fefcff]">
            {/* Dreamy Sky Pink Glow */}
            <div
              className="absolute inset-0 z-0 rounded-xl"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                  radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
              }}
            />
            <div className="relative z-10">
            <div
              className="text-xl font-bold"
              style={{ color: designTokens.colors.info }}
            >
              {formatCurrency(
                filteredHistory
                  .filter(h => h.action === 'claim')
                  .reduce((sum, h) => sum + h.amountUSD, 0)
              )}
            </div>
            <div
              className="text-sm"
              style={{ color: designTokens.colors.textSecondary }}
            >
              Total Claimed
            </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="relative rounded-2xl border overflow-hidden bg-[#fefcff]">
          {/* Dreamy Sky Pink Glow */}
          <div
            className="absolute inset-0 z-0 rounded-2xl"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
            }}
          />
          <div className="relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className="border-b"
                  style={{ borderColor: designTokens.colors.border }}
                >
                  <th
                    className="px-6 py-4 text-left text-sm font-medium"
                    style={{ color: designTokens.colors.textSecondary }}
                  >
                    Date
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-medium"
                    style={{ color: designTokens.colors.textSecondary }}
                  >
                    Action
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-medium"
                    style={{ color: designTokens.colors.textSecondary }}
                  >
                    Vault
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-medium"
                    style={{ color: designTokens.colors.textSecondary }}
                  >
                    Amount
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-medium"
                    style={{ color: designTokens.colors.textSecondary }}
                  >
                    Transaction
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item, index) => (
                  <tr
                    key={item.hash}
                    className={index < filteredHistory.length - 1 ? 'border-b' : ''}
                    style={{ borderColor: designTokens.colors.border }}
                  >
                    <td
                      className="px-6 py-4 text-sm"
                      style={{ color: designTokens.colors.textPrimary }}
                    >
                      {formatDate(item.timestamp)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`capitalize ${getActionColor(item.action)}`}>
                        {item.action}
                      </Badge>
                    </td>
                    <td
                      className="px-6 py-4 text-sm"
                      style={{ color: designTokens.colors.textPrimary }}
                    >
                      {getVaultName(item.vaultSlug)}
                    </td>
                    <td
                      className="px-6 py-4 text-sm font-medium"
                      style={{ color: designTokens.colors.textPrimary }}
                    >
                      {formatCurrency(item.amountUSD)}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`https://explorer.somnia.network/tx/${item.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-sm hover:opacity-80"
                        style={{ color: designTokens.colors.accent }}
                      >
                        <span>{shortenHash(item.hash)}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <p
                style={{
                  color: designTokens.colors.textSecondary,
                  fontSize: designTokens.typography.scale.body,
                }}
              >
                No transactions found for the selected filter.
              </p>
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}