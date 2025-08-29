"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { designTokens } from "../../../(lib)/designTokens";
import { formatPercent, getRiskColor } from "../../../(lib)/utils";
import type { Vault } from "../../../(lib)/vaultsData";
import RewardsRow from "../../(components)/RewardsRow";
import RewardLabels from "../../(components)/AirdropLabelList";
import { userVaultRewards } from "../../../(lib)/vaultsData";
import type { UserVaultRewards as UserVaultRewardsT } from "../../../(lib)/vaultsData";

import {
  useVaultStatic,
  useVaultDynamic,
  useVaultUserBalances,
  useVaultWithdrawInfo,
  fEth,
  formatLock,
} from "@/app/hooks/vaults/useReadVaults";

interface VaultCardProps {
  vault: Vault;
  onDeposit?: (vault: Vault) => void;
}

export default function VaultCard({ vault, onDeposit }: VaultCardProps) {
  const { name: nameOnChain, symbol: symbolOnChain } = useVaultStatic(
    vault.address
  );
  const { totalAssets } = useVaultDynamic(vault.address);
  const { shares } = useVaultUserBalances(vault.address);
  const { lockupSeconds } = useVaultWithdrawInfo(vault.address);

  const displayName = nameOnChain || vault.name;
  const displaySymbol = symbolOnChain || vault.symbol;
  const displayWithdrawal = formatLock(lockupSeconds) || vault.withdrawalTime;
  const userRewards = userVaultRewards.find(
    (r): r is UserVaultRewardsT => r.vaultSlug === vault.slug
  );

  return (
    <div
      className="relative overflow-hidden rounded-3xl border shadow-sm"
      style={{
        backgroundColor: "rgba(255,255,255,0.9)",
        borderColor: "rgba(0,0,0,0.06)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 100%, rgba(255,192,203,0.18), transparent 60%), radial-gradient(120% 80% at 100% 0%, rgba(173,216,230,0.16), transparent 60%)",
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 p-6 lg:p-7">
          <div className="mb-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src={vault.imageUrl}
                  alt={displayName}
                  width={50}
                  height={48}
                  className="rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  {displayName}
                </h3>
                <div className="text-xs text-slate-600 mt-0.5">
                  {displaySymbol}
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <Badge
                className={`px-2 py-1 text-xs rounded-full ${getRiskColor(
                  vault.risk
                )}`}
              >
                {vault.risk} Risk
              </Badge>
              <span className="px-3 py-1 rounded-full text-xs bg-slate-100 text-slate-700">
                Somnia
              </span>
            </div>
          </div>

          <p className="mb-6 text-sm leading-relaxed text-slate-700">
            {vault.description}
          </p>

          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-slate-700">
                Strategies:
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {vault.strategies.map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <RewardsRow
              logos={vault.rewardsLogos}
              multipliers={vault.rewardsMultipliers}
            />

            <RewardLabels
              items={
                userRewards?.rewardBalances?.length
                  ? userRewards.rewardBalances.map((reward: any) => ({
                      logo: reward.protocolLogo,
                      name: reward.protocolName, // ← ambil dari userRewards
                      multiplier: reward.multiplier,
                      points: reward.points,
                    }))
                  : vault.rewardsLogos.map((logo, i) => ({
                      logo,
                      name: vault.rewardsNames?.[i] ?? `Protocol ${i + 1}`, // fallback
                      multiplier: vault.rewardsMultipliers?.[i],
                      points: 0,
                    }))
              }
            />
          </div>
        </div>

        <div className="relative lg:col-span-1">
          <div
            className="flex h-full flex-col justify-between border-l p-6 lg:p-7"
            style={{
              background:
                "linear-gradient(180deg, rgba(236,72,153,0.08), rgba(236,72,153,0.03))",
              borderColor: "rgba(0,0,0,0.06)",
              backdropFilter: `blur(${designTokens.effects.blurGlass})`,
            }}
          >
            <div className="flex items-center justify-end gap-2 mb-4">
              <span className="text-xs font-medium text-slate-600">
                Network :
              </span>
              <div className="flex items-center gap-1">
                <Image
                  src="/Images/Logo/somnia_logo.png"
                  alt="Somnia Network"
                  width={16}
                  height={16}
                  className="rounded-sm"
                />
                <span className="text-xs font-semibold text-slate-700">
                  Somnia Network
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-4">
                <div>
                  <div className="mb-1 text-xs font-medium text-slate-600">
                    Est. Points APR
                  </div>
                  <div className="text-2xl font-bold text-rose-500">
                    {formatPercent(vault.estPointsAPR)}
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-xs font-medium text-slate-600">
                    Total Value Locked
                  </div>
                  <div className="text-lg font-semibold text-slate-900">
                    {fEth(totalAssets)}{" "}
                    <span className="text-sm text-slate-600">STT</span>
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-xs font-medium text-slate-600">
                    Withdrawal Time
                  </div>
                  <div className="text-sm text-slate-700">
                    {displayWithdrawal}
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-xs font-medium text-slate-600">
                    Vault Balance
                  </div>
                  <div className="text-sm text-slate-700">
                    {shares?.toString() ?? "0"}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center mr-15">
                {displayName === "SomETH Vault" && (
                  <Image
                    src="/Images/Logo/vault-1.png"
                    alt="Vault 1"
                    width={80}
                    height={80}
                    className="rounded-lg opacity-80"
                  />
                )}
                {displayName === "SomUSD Stable Vault" && (
                  <Image
                    src="/Images/Logo/vault-2.png"
                    alt="Vault 2"
                    width={80}
                    height={80}
                    className="rounded-lg opacity-80"
                  />
                )}
                {displayName === "SomPoints Boost Vault" && (
                  <Image
                    src="/Images/Logo/vault-3.png"
                    alt="Vault 3"
                    width={80}
                    height={80}
                    className="rounded-lg opacity-80"
                  />
                )}
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => onDeposit?.(vault)}
                  className="w-full font-medium cursor-pointer"
                  style={{
                    backgroundColor: "#ec4899",
                    color: "#ffffff",
                    borderRadius: designTokens.components.button.primary.radius,
                    boxShadow: "0 10px 22px rgba(236,72,153,0.35)",
                  }}
                >
                  Deposit
                </Button>
              </motion.div>

              <Link href={`/main/vaults/${vault.slug}`}>
                <Button
                  variant="outline"
                  className="w-full font-medium cursor-pointer"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#ec4899",
                    borderColor: "rgba(236,72,153,0.45)",
                    borderRadius:
                      designTokens.components.button.secondary.radius,
                  }}
                >
                  Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
