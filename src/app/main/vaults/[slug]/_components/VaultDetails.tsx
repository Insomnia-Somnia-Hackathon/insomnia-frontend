"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Vault } from "@/app/(lib)/mockData";
import VaultHeader from "./VaultHeader";
import VaultKpiPanel from "./VaultKpiPanel";
import VaultTabs from "./VaultTabs";
import VaultTabContent from "./VaultTabContent";
import VaultDetailsSkeleton from "./VaultDetailsSkeleton";
import Stepper from "./stepperUI";

interface VaultDetailsProps {
  vault: Vault;
}

export default function VaultDetails({ vault }: VaultDetailsProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "strategies" | "risks" | "docs"
  >("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <VaultDetailsSkeleton />;
  }

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: "url(/Images/Background/vault-background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/45 backdrop-blur-sm z-0" />

      <section className="relative z-10 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/main/vaults"
              className="inline-flex items-center gap-2 text-rose-500 hover:opacity-80"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Vaults</span>
            </Link>
          </div>

          {/* Header & KPI */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 space-y-6">
              <VaultHeader vault={vault} />
              <div className="max-w-3xl">
                <Stepper />
              </div>
            </div>
            <VaultKpiPanel vault={vault} />
          </div>

          {/* Tabs */}
          <VaultTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Content */}
          <VaultTabContent vault={vault} activeTab={activeTab} />
        </div>
      </section>
    </div>
  );
}
