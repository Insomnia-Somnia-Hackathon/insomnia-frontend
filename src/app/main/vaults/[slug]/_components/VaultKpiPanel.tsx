"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { Vault } from "@/app/(lib)/vaultsData";
import { designTokens } from "@/app/(lib)/designTokens";
import { formatPercent } from "@/app/(lib)/utils";
import { Kpi } from "./helper";
import {
  useVaultDynamic,
  useVaultWithdrawInfo,
  fEth,
  formatLock,
  useVaultStatic,
} from "@/app/hooks/vaults/useReadVaults";

interface VaultKpiPanelProps {
  vault: Vault;
  onDeposit?: (vault: Vault) => void;
  onWithdraw?: (vault: Vault) => void;
}

export default function VaultKpiPanel({
  vault,
  onDeposit,
  onWithdraw,
}: VaultKpiPanelProps) {
  const { name: nameOnChain } = useVaultStatic(vault.address);
  const { totalAssets } = useVaultDynamic(vault.address);
  const { lockupSeconds, earlyExitFeePct, unlockCountdown, isLocked } =
    useVaultWithdrawInfo(vault.address);

  const displayName = nameOnChain || vault.name;
  const showUnlock = isLocked && !!unlockCountdown;
  const showExitFee = earlyExitFeePct > 0;

  return (
    <div
      className="relative p-6 rounded-2xl border shadow-sm"
      style={{
        backgroundColor: "rgba(255,255,255,0.85)",
        borderColor: "rgba(15,23,42,0.06)",
        backdropFilter: `blur(${designTokens.effects.blurGlass})`,
      }}
    >
      <div className="pointer-events-none select-none hidden lg:block">
        {displayName === "SomETH Vault" && (
          <Image
            src="/Images/Logo/vault-1.png"
            alt="Vault"
            width={128}
            height={128}
            className="absolute -z-10 bottom-6 right-6 opacity-80"
          />
        )}
        {displayName === "SomUSD Stable Vault" && (
          <Image
            src="/Images/Logo/vault-2.png"
            alt="Vault"
            width={128}
            height={128}
            className="absolute -z-10 bottom-6 right-6 opacity-80"
          />
        )}
        {displayName === "SomPoints Boost Vault" && (
          <Image
            src="/Images/Logo/vault-3.png"
            alt="Vault"
            width={128}
            height={128}
            className="absolute -z-10 bottom-6 right-6 opacity-80"
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] items-start gap-6">
        <div className="flex flex-col space-y-4 md:space-y-5">
          <Kpi
            label="Est. Points APR"
            value={formatPercent(vault.estPointsAPR)}
            highlight
          />
          <Kpi label="Total Value Locked" value={`${fEth(totalAssets)} STT`} />
          <Kpi label="Withdrawal Time" value={formatLock(lockupSeconds)} />
          {showUnlock && <Kpi label="Your Unlock" value={unlockCountdown} />}
          {showExitFee && (
            <Kpi
              label="Early Exit Fee"
              value={`${earlyExitFeePct.toFixed(2)}%`}
            />
          )}

          <div className="grid grid-cols-1 gap-3 pt-1">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => onDeposit?.(vault)}
                className="w-full font-medium rounded-full cursor-pointer"
                style={{
                  backgroundColor: "#ec4899",
                  color: "#fff",
                  boxShadow: "0 10px 22px rgba(236,72,153,0.35)",
                }}
              >
                Deposit
              </Button>
            </motion.div>

            <Button
              variant="outline"
              onClick={() => onWithdraw?.(vault)}
              className="cursor-pointer w-full font-medium rounded-full"
              style={{
                backgroundColor: "#ffffff",
                color: "#ec4899",
                borderColor: "rgba(236,72,153,0.45)",
              }}
            >
              Withdraw
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <span className="text-xs font-medium text-slate-600">Network :</span>
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
    </div>
  );
}
