"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { Vault } from "@/app/(lib)/vaultsData";
import { designTokens } from "@/app/(lib)/designTokens";
import { formatPercent } from "@/app/(lib)/utils";
import { Kpi } from "./helper";
import { useAccount } from "wagmi";
import {
  useVaultDynamic,
  useVaultWithdrawInfo,
  useVaultUserBalances,
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
  const { totalAssets, totalSupply } = useVaultDynamic(vault.address);
  const { address } = useAccount();
  const { shares } = useVaultUserBalances(
    vault.address,
    address as `0x${string}` | undefined
  );
  const { lockupSeconds, earlyExitFeePct, unlockCountdown, isLocked } =
    useVaultWithdrawInfo(vault.address);

  const estRedeem =
    totalSupply && totalSupply > BigInt(0)
      ? (shares * totalAssets) / totalSupply
      : BigInt(0);

  const showUnlock = isLocked && !!unlockCountdown;
  const showExitFee = earlyExitFeePct > 0;

  const EmptyCell = () => <div className="hidden md:block" />;

  const STTValue = (amount: string) => (
    <span className="inline-flex items-center gap-2">
      <span>{amount} STT</span>
      <Image
        src="/Images/Logo/somnia_logo.png"
        alt="logo-stt"
        width={17}
        height={10}
      />
    </span>
  );

  return (
    <div
      className="relative p-6 rounded-2xl border shadow-sm"
      style={{
        backgroundColor: "rgba(255,255,255,0.85)",
        borderColor: "rgba(15,23,42,0.06)",
        backdropFilter: `blur(${designTokens.effects.blurGlass})`,
      }}
    >
      {/* decorative image */}
      {/* <div className="pointer-events-none select-none hidden lg:block">
        {displayName === "SomETH Vault" && (
          <Image
            src="/Images/Logo/vault-1.png"
            alt="Vault"
            width={140}
            height={140}
            className="absolute -z-10 bottom-6 right-6 opacity-80"
          />
        )}
        {displayName === "SomUSD Stable Vault" && (
          <Image
            src="/Images/Logo/vault-2.png"
            alt="Vault"
            width={140}
            height={140}
            className="absolute -z-10 bottom-6 right-6 opacity-80"
          />
        )}
        {displayName === "SomPoints Boost Vault" && (
          <Image
            src="/Images/Logo/vault-3.png"
            alt="Vault"
            width={140}
            height={140}
            className="absolute -z-10 bottom-6 right-6 opacity-80"
          />
        )}
      </div> */}

      {/* grid: 1 col on mobile, 2 cols on md+, each row has L/R cells to keep alignment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 items-start mt-5">
        {/* Row 0: APR (L) vs Network (R) */}
        <Kpi
          label="Est. Points APR"
          value={formatPercent(vault.estPointsAPR)}
          highlight
        />
        <div className="items-center justify-start md:justify-end gap-2">
          <span className="text-xs font-medium text-slate-600">Network :</span>
          <div className="flex gap-2 mt-2">
            <Image
              src="/Images/Logo/somnia_logo.png"
              alt="Somnia Network"
              width={18}
              height={18}
              className="rounded-sm"
            />
            <span className="text-xs font-semibold text-slate-700">
              Somnia Network
            </span>
          </div>
        </div>

        {/* Row 1: TVL vs Est Redeem */}
        <Kpi label="Total Value Locked" value={STTValue(fEth(totalAssets))} />
        <Kpi label="Est. Redeem Value" value={STTValue(fEth(estRedeem))} />

        {/* Row 2: Vault tokens vs Withdrawal time */}
        <Kpi label="Your Vault Tokens" value={`${fEth(shares)}`} />
        <Kpi label="Withdrawal Time" value={formatLock(lockupSeconds)} />

        {/* Row 3: Unlock (opt) vs Exit fee (opt) — keep cells paired */}
        {showUnlock ? (
          <Kpi label="Your Unlock" value={unlockCountdown} />
        ) : (
          <EmptyCell />
        )}
        {showExitFee ? (
          <Kpi
            label="Early Exit Fee"
            value={`${earlyExitFeePct.toFixed(2)}%`}
          />
        ) : (
          <EmptyCell />
        )}

        {/* Row 4: Actions (span 2) */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
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
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
