import { vaults } from "@/app/(lib)/vaultsData";

export function getActionColor(action: string) {
  switch (action) {
    case 'deposit':
      return 'bg-emerald-500/12 text-emerald-600 ring-1 ring-emerald-500/25';
    case 'withdraw':
      return 'bg-rose-500/12 text-rose-600 ring-1 ring-rose-500/25';
    case 'claim':
      return 'bg-sky-500/12 text-sky-600 ring-1 ring-sky-500/25';
    default:
      return 'bg-slate-500/12 text-slate-600 ring-1 ring-slate-500/25';
  }
}

export function getVaultName(slug: string) {
  return vaults.find((v) => v.slug === slug)?.name || slug;
}
