"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter } from "lucide-react";
import { designTokens } from "@/app/(lib)/designTokens";
import { vaults } from "@/app/(lib)/mockData";
import type { Vault } from "@/app/(lib)/mockData";
import VaultCard from "./VaultCard";
import VaultsGridSkeleton from "./VaultsGridSkeleton";
import Popup from "./Popup";
import Image from "next/image";

export default function VaultsGrid() {
  const [selectedRisk, setSelectedRisk] = useState<
    "All" | "Low" | "Moderate" | "High"
  >("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const filteredVaults = vaults.filter(
    (v: Vault) => selectedRisk === "All" || v.risk === selectedRisk
  );

  const riskOptions = ["All", "Low", "Moderate", "High"] as const;

  const handleDeposit = (vault: Vault) => {
    setSelectedVault(vault);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedVault(null);
  };

  if (isLoading) {
    return <VaultsGridSkeleton count={3} />;
  }

  return (
    <>
      <Popup 
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        vaultName={selectedVault?.name || ""}
      />
      <div
        className="min-h-screen relative"
        style={{
          backgroundImage: "url(/Images/Background/vault-background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white/45 backdrop-blur-md z-0" />

      <section className="relative z-10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center mt-10">
                <h1
                  className="font-extrabold mix-blend-difference text-black"
                  style={{ fontSize: designTokens.typography.scale.h1 }}
                >
                  Insomnia Vaults
                </h1>
                <div className="ml-3 flex items-center">
                  {/* <Sparkles className="w-10 text-pink-400 h-10 align-middle" /> */}
                  <Image
                    src="/Images/Logo/somnia_logo.png"
                    alt="somnia"
                    width={40}
                    height={40}
                  />
                </div>
              </div>

              <p className="text-slate-800/90 drop-shadow-[0_1px_6px_rgba(255,255,255,0.6)]">
                Choose from our selection of optimized vaults to maximize your
                airdrop points & yield.
              </p>
            </div>

            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen((v) => !v)}
                className="flex items-center gap-2 shadow-sm"
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  color: "#0B1117",
                  borderColor: "rgba(0,0,0,0.08)",
                  borderRadius: designTokens.components.button.secondary.radius,
                }}
              >
                <Filter className="h-4 w-4" />
                <span>{selectedRisk} Risk</span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              {isFilterOpen && (
                <div
                  className="absolute right-0 top-full mt-2 py-2 w-44 rounded-lg border shadow-lg z-10"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.96)",
                    borderColor: "rgba(0,0,0,0.08)",
                  }}
                >
                  {riskOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedRisk(option);
                        setIsFilterOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-black/5"
                      style={{
                        color: option === selectedRisk ? "#0B1117" : "#475569",
                        fontWeight: option === selectedRisk ? 600 : 500,
                      }}
                    >
                      {option} Risk
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div
            className="grid grid-cols-1 gap-6"
            style={{ gap: designTokens.layout.gridGap }}
          >
            {filteredVaults.map((vault) => (
              <div
                key={vault.slug}
                className="rounded-2xl p-6 shadow-md border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(8px)",
                  borderColor: "rgba(0,0,0,0.06)",
                }}
              >
                <div className="text-slate-900">
                  <VaultCard vault={vault} onDeposit={handleDeposit} />
                </div>
              </div>
            ))}
          </div>

          {filteredVaults.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-700">
                No vaults match your current filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>
      </div>
    </>
  );
}
