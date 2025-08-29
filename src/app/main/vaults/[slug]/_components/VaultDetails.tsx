"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Vault } from "@/app/(lib)/vaultsData";
import { VaultHeader, VaultKpiPanel, VaultTabs, VaultTabContent, VaultDetailsSkeleton } from "./index"
import Stepper from "./stepperUI";
import Popup from "../../_components/Popup";
import SecondaryNav from "@/app/main/(components)/SecondaryNav";

interface VaultDetailsProps {
  vault: Vault;
}
type PopupMode = "deposit" | "withdraw";

export default function VaultDetails({ vault }: VaultDetailsProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "strategies" | "risks" | "docs"
  >("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mode, setMode] = useState<PopupMode>("deposit");

  const openDeposit = (_v?: Vault) => {  
    setMode("deposit");
    setIsPopupOpen(true);
  };
  const openWithdraw = (_v?: Vault) => {
    setMode("withdraw");
    setIsPopupOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleDeposit = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  if (isLoading) return <VaultDetailsSkeleton />;

  return (
    <>
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} vault={vault} mode={mode} />
      <SecondaryNav />

      <div
        className="min-h-screen w-full relative"
        style={{
          backgroundImage: "url(/Images/Background/vault-background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white/45 backdrop-blur-sm z-0" />

        <section className="relative z-10 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
            <div className="mb-6">
              <Link
                href="/main/vaults"
                className="inline-flex items-center gap-2 text-rose-500 hover:opacity-80"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Vaults</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 space-y-6">
                <VaultHeader vault={vault} />
                <div className="max-w-3xl">
                  <Stepper />
                </div>
              </div>
              <VaultKpiPanel vault={vault} onDeposit={openDeposit} onWithdraw={openWithdraw}/>
            </div>

            <VaultTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <VaultTabContent vault={vault} activeTab={activeTab} />
          </div>
        </section>
      </div>
    </>
  );
}
