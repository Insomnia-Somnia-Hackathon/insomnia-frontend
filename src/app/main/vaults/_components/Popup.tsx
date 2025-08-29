"use client";

import React, { useMemo, useState } from "react";
import { X, CheckCircle2, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { parseEther } from "viem";
import type { Vault } from "@/app/(lib)/vaultsData";
import { designTokens } from "../../../(lib)/designTokens";

import {
  useDepositNative,
  useWithdrawShares,
} from "@/app/hooks/vaults/useWriteVaults";

import {
  useVaultUserBalances,
  usePreviewWithdraw,
} from "@/app/hooks/vaults/useReadVaults";
import { useAccount, useBalance } from "wagmi";

// const EXPLORER_BASE_TX = "https://shannon-explorer.somnia.network/tx";

const GAS_BUFFER_STT = "0.002";

type Mode = "deposit" | "withdraw";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  vault?: Vault;
  mode?: Mode;
}

export default function Popup({
  isOpen,
  onClose,
  vault,
  mode = "deposit",
}: PopupProps) {
  const vaultAddr = (vault?.address ??
    "0x0000000000000000000000000000000000000000") as `0x${string}`;

  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);

  const { address } = useAccount();

  const { data: nativeBal } = useBalance({
    address,
  });
  const availableWei = nativeBal?.value ?? BigInt(0);
  const gasBufferWei = useMemo(
    () => parseEther(GAS_BUFFER_STT as `${string}`),
    []
  );
  const maxDepositWei = useMemo(
    () =>
      availableWei > gasBufferWei ? availableWei - gasBufferWei : BigInt(0),
    [availableWei, gasBufferWei]
  );

  const { shares } = useVaultUserBalances(
    vaultAddr,
    address as `0x${string}` | undefined
  );

  const sharesInput = useMemo(
    () => (amount ? parseEther(amount as `${string}`) : undefined),
    [amount]
  );
  const { assetsOut } = usePreviewWithdraw(vaultAddr, sharesInput);

  const dep = useDepositNative(vaultAddr);
  const wd = useWithdrawShares(vaultAddr);

  const isPending = mode === "deposit" ? dep.isPending : wd.isPending;
  const isSuccess = mode === "deposit" ? dep.isSuccess : wd.isSuccess;
  const txHash = mode === "deposit" ? dep.txHash : wd.txHash;
  const error = mode === "deposit" ? dep.error : wd.error;

  const canSubmit = useMemo(() => {
    const n = Number(amount);
    if (!vault || !amount || Number.isNaN(n) || n <= 0 || isPending)
      return false;
    if (mode === "deposit") {
      try {
        const valueWei = parseEther(amount as `${string}`);
        return valueWei <= maxDepositWei;
      } catch {
        return false;
      }
    }
    return true;
  }, [amount, isPending, vault, mode, maxDepositWei]);

  async function onSubmit() {
    try {
      if (!vault) throw new Error("Vault is not selected");
      if (mode === "deposit") {
        const valueWei = parseEther(amount as `${string}`);
        await dep.deposit(valueWei, undefined);
      } else {
        const sharesWei = parseEther(amount as `${string}`);
        await wd.withdraw(sharesWei, undefined);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function setMaxDeposit() {
    setAmount(formatEtherHuman(maxDepositWei));
  }

  function setMaxWithdraw() {
    setAmount(formatEtherHuman(shares));
  }

  const copyTx = async () => {
    if (!txHash) return;
    await navigator.clipboard?.writeText(txHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const showInsufficientAfterGas =
    mode === "deposit" &&
    amount &&
    (() => {
      try {
        const v = parseEther(amount as `${string}`);
        return v > maxDepositWei;
      } catch {
        return false;
      }
    })();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-md mx-4 rounded-3xl border shadow-2xl overflow-hidden"
            style={{
              backgroundColor: "rgba(255,255,255,0.95)",
              borderColor: "rgba(236,72,153,0.2)",
              backdropFilter: "blur(20px)",
            }}
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 relative"
              style={{
                background:
                  "linear-gradient(135deg, rgba(236,72,153,0.1), rgba(255,192,203,0.1))",
              }}
            >
              <div className="relative flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">
                  {isSuccess
                    ? mode === "deposit"
                      ? "Deposit Successful"
                      : "Withdraw Successful"
                    : `${mode === "deposit" ? "Deposit" : "Withdraw"} ${
                        vault?.name ?? "Vault"
                      }`}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/50 rounded-full cursor-pointer"
                >
                  <X className="h-5 w-5 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* SUCCESS */}
              {isSuccess ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    <div className="text-slate-700">
                      {mode === "deposit"
                        ? "Your deposit was confirmed on-chain."
                        : "Your withdrawal was confirmed on-chain."}
                    </div>
                  </div>

                  <div
                    className="rounded-xl border p-4 bg-white"
                    style={{ borderColor: "rgba(236,72,153,0.2)" }}
                  >
                    <div className="text-xs font-medium text-slate-500 mb-1">
                      Transaction Hash
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <code className="text-[12px] text-slate-800 break-all">
                        {txHash}
                      </code>
                      <button
                        onClick={copyTx}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border hover:bg-slate-50"
                        style={{ borderColor: "rgba(0,0,0,0.08)" }}
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>

                    <div className="mt-3">
                      <a
                        href={`https://shannon-explorer.somnia.network/tx/${txHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:opacity-80"
                      >
                        View on Explorer
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={onClose}
                      className="cursor-pointer flex-1 h-11"
                      style={{
                        backgroundColor: "#ec4899",
                        color: "#ffffff",
                        borderRadius:
                          designTokens.components.button.primary.radius,
                        boxShadow: "0 10px 22px rgba(236,72,153,0.25)",
                      }}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className="flex items-center gap-3 p-4 border rounded-2xl bg-white"
                    style={{ borderColor: "rgba(236,72,153,0.2)" }}
                  >
                    <Image
                      src="/Images/Logo/somnia_logo.png"
                      alt="STT"
                      width={28}
                      height={28}
                      className="rounded-md"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">STT</div>
                      <div className="text-xs text-slate-500">
                        Somnia Native Token
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">
                      {mode === "deposit" ? "Native" : "Redeem"}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {mode === "deposit"
                        ? "Amount (STT)"
                        : "Vault Tokens to Withdraw"}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        min="0"
                        className="w-full p-4 border rounded-2xl bg-white text-black focus:outline-none focus:ring-2 transition-all no-spinner"
                      />

                      {mode === "deposit" ? (
                        <button
                          type="button"
                          onClick={setMaxDeposit}
                          className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: "rgba(236,72,153,0.1)",
                            color: "#ec4899",
                          }}
                        >
                          MAX
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={setMaxWithdraw}
                          className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: "rgba(236,72,153,0.1)",
                            color: "#ec4899",
                          }}
                        >
                          MAX
                        </button>
                      )}
                    </div>

                    {mode === "deposit" && (
                      <div className="mt-1 text-xs text-slate-600">
                        Available: <b>{formatEtherHuman(availableWei)}</b> STT
                        <span className="ml-1 text-slate-500">
                          (keeps ~{GAS_BUFFER_STT} STT for gas)
                        </span>
                      </div>
                    )}

                    {mode === "withdraw" && (
                      <div className="mt-2 text-xs text-slate-600">
                        Available to Withdraw: <b>{formatEtherHuman(shares)}</b>{" "}
                        — Estimated receive:{" "}
                        <b>{formatEtherHuman(assetsOut)} STT</b>
                      </div>
                    )}

                    {showInsufficientAfterGas && (
                      <div className="mt-2 text-xs text-red-500">
                        Amount exceeds your balance after reserving gas. Try
                        MAX.
                      </div>
                    )}
                  </div>

                  {(isPending || error) && (
                    <div
                      className="text-xs rounded-xl p-3 border"
                      style={{
                        borderColor: "rgba(236,72,153,0.2)",
                        background: "rgba(236,72,153,0.05)",
                      }}
                    >
                      {isPending && (
                        <div className="text-pink-400">
                          Transaction submitted… waiting for confirmation.
                        </div>
                      )}
                      {error && (
                        <div className="text-red-500">
                          Error: {String(error.message ?? error)}
                        </div>
                      )}
                    </div>
                  )}

                  <motion.div
                    className="flex gap-3 pt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        onClick={onClose}
                        variant="outline"
                        className="cursor-pointer w-full h-12 font-medium"
                        style={{
                          backgroundColor: "#ffffff",
                          color: "#ec4899",
                          borderColor: "rgba(236,72,153,0.3)",
                          borderRadius:
                            designTokens.components.button.secondary.radius,
                        }}
                      >
                        Cancel
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        onClick={onSubmit}
                        disabled={!canSubmit}
                        className="cursor-pointer w-full h-12 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: "#ec4899",
                          color: "#ffffff",
                          borderRadius:
                            designTokens.components.button.primary.radius,
                          boxShadow: "0 10px 22px rgba(236,72,153,0.25)",
                        }}
                      >
                        {isPending
                          ? mode === "deposit"
                            ? "Depositing…"
                            : "Withdrawing…"
                          : mode === "deposit"
                          ? "Deposit"
                          : "Withdraw"}
                      </Button>
                    </motion.div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function formatEtherHuman(v?: bigint) {
  if (v === undefined) return "0";
  try {
    const n = Number(v) / 1e18;
    return Number.isFinite(n) ? n.toLocaleString() : (v as bigint).toString();
  } catch {
    return (v as bigint).toString();
  }
}
