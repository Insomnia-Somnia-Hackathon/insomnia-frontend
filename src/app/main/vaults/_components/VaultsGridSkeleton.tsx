"use client";

import React from "react";
import { designTokens } from "@/app/(lib)/designTokens";
import VaultCardSkeleton from "./VaultCardSkeleton";

interface VaultsGridSkeletonProps {
  count?: number;
}

export default function VaultsGridSkeleton({
  count = 3,
}: VaultsGridSkeletonProps) {
  return (
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
                <div
                  className="h-12 bg-gray-300 rounded-lg animate-pulse"
                  style={{ width: "280px" }}
                />
                <div className="ml-3 flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded animate-pulse" />
                </div>
              </div>

              <div className="mt-2 space-y-2">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-96" />
                <div className="h-4 bg-gray-300 rounded animate-pulse w-72" />
              </div>
            </div>

            <div className="relative">
              <div
                className="h-10 bg-gray-300 rounded-lg animate-pulse"
                style={{ width: "120px" }}
              />
            </div>
          </div>

          <div
            className="grid grid-cols-1 gap-6"
            style={{ gap: designTokens.layout.gridGap }}
          >
            {Array.from({ length: count }, (_, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 shadow-md border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(8px)",
                  borderColor: "rgba(0,0,0,0.06)",
                }}
              >
                <div className="text-slate-900">
                  <VaultCardSkeleton />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
