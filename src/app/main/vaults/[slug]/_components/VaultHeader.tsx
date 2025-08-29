"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Vault } from "@/app/(lib)/vaultsData";
import { getRiskColor } from "@/app/(lib)/utils";
import { cnBadge } from "./helper";
import { useVaultStatic } from "@/app/hooks/vaults/useReadVaults";

export default function VaultHeader({ vault }: { vault: Vault }) {
  const { name, symbol } = useVaultStatic(vault.address);

  return (
    <div className="lg:col-span-2">
      <div className="flex items-start gap-4">
        <div className="size-15 rounded-full flex items-center justify-center bg-pink-100 text-pink-500">
          {vault.slug === "som-eth" && (
            <Image
              src="/Images/Logo/eth-logo.png"
              alt="Vault 1"
              width={100}
              height={20}
            />
          )}
          {vault.slug === "som-usd" && (
            <Image
              src="/Images/Logo/somnia_logo.png"
              alt="Vault 2"
              width={100}
              height={20}
            />
          )}
          {vault.slug === "som-points" && (
            <Image
              src="/Images/Logo/usdc-logo.png"
              alt="Vault 3"
              width={100}
              height={20}
            />
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {name || vault.name}
          </h1>
          <div className="text-xs text-slate-600 mt-1">
            {symbol || vault.symbol}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <Badge className={cnBadge(getRiskColor(vault.risk))}>
              {vault.risk} Risk
            </Badge>
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
  );
}
