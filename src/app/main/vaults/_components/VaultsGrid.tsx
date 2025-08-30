"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter } from "lucide-react";
import { designTokens } from "@/app/(lib)/designTokens";
import { vaults } from "@/app/(lib)/vaultsData";
import type { Vault } from "@/app/(lib)/vaultsData";
import VaultCard from "./VaultCard";
import VaultsGridSkeleton from "./VaultsGridSkeleton";
import Popup from "./Popup";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function VaultsGrid() {
  const [selectedRisk, setSelectedRisk] = useState<"All" | "Low" | "Moderate" | "High">("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredVaults = vaults.filter((v) => selectedRisk === "All" || v.risk === selectedRisk);
  const riskOptions = ["All", "Low", "Moderate", "High"] as const;

  const handleDeposit = (vault: Vault) => {
    setSelectedVault(vault);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedVault(null);
  };

  if (isLoading) return <VaultsGridSkeleton count={3} />;

  return (
    <>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        vault={selectedVault ?? undefined}
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
                    <Image
                      src="/Images/gif/insomnia-vaults.gif"
                      alt="somnia"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <p className="text-slate-800/90 drop-shadow-[0_1px_6px_rgba(255,255,255,0.6)]">
                  Choose from our selection of optimized vaults to maximize your
                  airdrop points & yield.
                </p>
              </div>

              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen((v) => !v)}
                    className="flex items-center gap-2 shadow-sm cursor-pointer"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      color: "#0B1117",
                      borderColor: "rgba(0,0,0,0.08)",
                      borderRadius: designTokens.components.button.secondary.radius,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: isFilterOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Filter className="h-4 w-4" />
                    </motion.div>
                    <span>{selectedRisk} Risk</span>
                    <motion.div
                      animate={{ rotate: isFilterOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </motion.div>

                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-2 py-2 w-44 rounded-lg border shadow-lg z-10"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.96)",
                        borderColor: "rgba(0,0,0,0.08)",
                      }}
                    >
                      {riskOptions.map((option, index) => (
                        <motion.button
                          key={option}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                          whileHover={{ 
                            backgroundColor: "rgba(0,0,0,0.05)",
                            x: 4,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedRisk(option);
                            setIsFilterOpen(false);
                          }}
                          className="cursor-pointer w-full px-4 py-2 text-left transition-colors duration-200"
                          style={{
                            color: option === selectedRisk ? "#0B1117" : "#475569",
                            fontWeight: option === selectedRisk ? 600 : 500,
                          }}
                        >
                          {option} Risk
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6" style={{ gap: designTokens.layout.gridGap }}>
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
