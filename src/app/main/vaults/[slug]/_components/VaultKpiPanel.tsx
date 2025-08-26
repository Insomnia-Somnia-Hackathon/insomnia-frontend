"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Vault } from "@/app/(lib)/mockData";
import { designTokens } from "@/app/(lib)/designTokens";
import { formatCurrency, formatPercent } from "@/app/(lib)/utils";
import { Kpi } from "./helper";

interface VaultKpiPanelProps {
  vault: Vault;
  onDeposit?: (vault: Vault) => void;
}

export default function VaultKpiPanel({ vault, onDeposit }: VaultKpiPanelProps) {
  return (
    <div
      className="p-6 rounded-2xl border shadow-sm"
      style={{
        backgroundColor: "rgba(255,255,255,0.85)",
        borderColor: "rgba(15,23,42,0.06)",
        backdropFilter: `blur(${designTokens.effects.blurGlass})`,
      }}
    >
      {/* 2-column grid: KPI on the left, stacked content on the right */}
      <div className="grid grid-cols-[1fr_auto] gap-4">
        {/* left column */}
        <div className="flex flex-col space-y-6">
          <Kpi
            label="Est. Points APR"
            value={formatPercent(vault.estPointsAPR)}
            highlight
          />
          <Kpi label="Total Value Locked" value={formatCurrency(vault.tvlUSD)} />
          <Kpi label="Your Balance" value="$0.00" muted />

          {/* Deposit / Withdraw buttons */}
          <div className="space-y-3 pt-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
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

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full font-medium rounded-full"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#ec4899",
                    borderColor: "rgba(236,72,153,0.45)",
                  }}
                >
                  Withdraw
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw from {vault.name}</DialogTitle>
                </DialogHeader>
                <div className="py-4 text-slate-600">
                  Withdrawal flow goes here.
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* right column – stacked top-to-bottom, no leftover space */}
        <div className="flex flex-col items-end justify-between h-full">
          {/* powered-by row */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600">Network : </span>
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

          {/* illustration flush-bottom */}
          <div className="relative mt-4">
            <span
              className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl opacity-60
              bg-gradient-to-br from-pink-200/60 via-fuchsia-200/50 to-sky-200/50"
            />
            {vault.slug === "som-eth" && (
              <Image
                src="/Images/Logo/vault-1.png"
                alt="Vault 1"
                width={144}
                height={144}
                className="w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain"
              />
            )}
            {vault.slug === "som-usd" && (
              <Image
                src="/Images/Logo/vault-2.png"
                alt="Vault 2"
                width={144}
                height={144}
                className="w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain"
              />
            )}
            {vault.slug === "som-points" && (
              <Image
                src="/Images/Logo/vault-3.png"
                alt="Vault 3"
                width={144}
                height={144}
                className="w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}