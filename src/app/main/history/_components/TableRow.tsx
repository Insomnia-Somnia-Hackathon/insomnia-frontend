import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { formatCurrency, formatDate, shortenHash } from '@/app/(lib)/utils';
import { getActionColor, getVaultName } from './helpers';

export default function TableRow({
  item,
  showBorder,
}: {
  item: {
    hash: string;
    timestamp: number;
    action: 'deposit' | 'withdraw' | 'claim';
    vaultSlug: string;
    amountUSD: number;
  };
  showBorder: boolean;
}) {
  return (
    <tr
      className={`transition-colors ${showBorder ? 'border-b border-white/60' : ''} hover:bg-white/40`}
    >
      <td className="px-6 py-4 text-sm" style={{ color: '#0f172a' }}>
        {formatDate(new Date(item.timestamp))}
      </td>

      <td className="px-6 py-4">
        <Badge className={`rounded-full px-2 py-0.5 text-xs ${getActionColor(item.action)}`}>
          {item.action}
        </Badge>
      </td>

      <td className="px-6 py-4 text-sm" style={{ color: '#0f172a' }}>
        {getVaultName(item.vaultSlug)}
      </td>

      <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#0f172a' }}>
        {formatCurrency(item.amountUSD)}
      </td>

      <td className="px-6 py-4">
        <a
          href={`https://explorer.somnia.network/tx/${item.hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm hover:opacity-90"
          style={{ color: '#16a34a' }}
        >
          <span className="font-medium">{shortenHash(item.hash)}</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </td>
    </tr>
  );
}
