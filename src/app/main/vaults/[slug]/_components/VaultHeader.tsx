import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Vault } from '@/app/(lib)/mockData';
import { getRiskColor } from '@/app/(lib)/utils';
import { cnBadge } from './helper';

export default function VaultHeader({ vault }: { vault: Vault }) {
  return (
    <div className="lg:col-span-2">
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="size-14 rounded-xl flex items-center justify-center bg-pink-100 text-pink-500">
          {vault.slug === 'som-eth' && <Image src="/Images/Logo/vault-1.png" alt="Vault 1" width={20} height={20} />}
          {vault.slug === 'som-usd' && <Image src="/Images/Logo/vault-2.png" alt="Vault 2" width={20} height={20} />}
          {vault.slug === 'som-points' && <Image src="/Images/Logo/vault-3.png" alt="Vault 3" width={20} height={20} />}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{vault.name}</h1>

          <div className="mt-2 flex items-center gap-2">
            <Badge className={cnBadge(getRiskColor(vault.risk))}>{vault.risk} Risk</Badge>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/75 text-slate-700 border border-white/60 backdrop-blur">
              Somnia Network
            </span>
          </div>

          <p className="mt-4 text-slate-700 leading-relaxed">{vault.description}</p>
        </div>
      </div>
    </div>
  );
}
