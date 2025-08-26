import React from 'react';
import TableRow from './TableRow';

export default function TransactionsTable({
  filteredHistory,
}: {
  filteredHistory: {
    hash: string;
    timestamp: number;
    action: 'deposit' | 'withdraw' | 'claim';
    vaultSlug: string;
    amountUSD: number;
  }[];
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border shadow-sm">
      {/* glass base */}
      <div className="absolute inset-0 rounded-2xl bg-white/75 backdrop-blur-xl ring-1 ring-white/50" />
      {/* very soft glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(120% 90% at 12% 100%, rgba(236,72,153,0.12), transparent 60%), radial-gradient(120% 90% at 88% 0%, rgba(14,165,233,0.10), transparent 60%)',
        }}
      />

      <div className="relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/60 text-left">
                {['Date', 'Action', 'Vault', 'Amount', 'Transaction'].map((th) => (
                  <th key={th} className="px-6 py-4 text-sm font-semibold" style={{ color: '#334155' }}>
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item, i) => (
                <TableRow key={item.hash} item={item} showBorder={i < filteredHistory.length - 1} />
              ))}
            </tbody>
          </table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm" style={{ color: '#334155' }}>
              No transactions found for the selected filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
