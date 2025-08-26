"use client";

import React from "react";
import { designTokens } from "@/app/(lib)/designTokens";

export default function VaultDetailsSkeleton() {
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
          {/* Breadcrumb Skeleton */}
          <div className="mb-8">
            <div className="h-6 bg-gray-300 rounded animate-pulse w-32" />
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Vault Header + Stepper */}
            <div className="lg:col-span-2 space-y-8">
              {/* Vault Header Skeleton */}
              <div
                className="p-6 rounded-2xl border shadow-md"
                style={{
                  backgroundColor: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(8px)",
                  borderColor: "rgba(0,0,0,0.06)",
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg animate-pulse flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-8 bg-gray-300 rounded animate-pulse w-64 mb-3" />
                    <div className="flex items-center gap-2">
                      <div className="h-6 bg-gray-300 rounded-full w-20 animate-pulse" />
                      <div className="h-6 bg-gray-300 rounded-full w-16 animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4" />
                </div>
              </div>

              {/* Stepper Skeleton */}
              <div
                className="p-6 rounded-2xl border shadow-md"
                style={{
                  backgroundColor: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(8px)",
                  borderColor: "rgba(0,0,0,0.06)",
                }}
              >
                <div className="h-6 bg-gray-300 rounded animate-pulse w-40 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse mb-3" />
                      <div className="h-4 bg-gray-300 rounded animate-pulse w-20 mb-2" />
                      <div className="h-3 bg-gray-300 rounded animate-pulse w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - KPI Panel */}
            <div className="lg:col-span-1">
              <div
                className="p-6 rounded-2xl border shadow-md sticky top-8"
                style={{
                  backgroundColor: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(8px)",
                  borderColor: "rgba(0,0,0,0.06)",
                }}
              >
                {/* Network Header Skeleton */}
                <div className="flex items-center justify-end gap-2 mb-6">
                  <div className="h-3 bg-gray-300 rounded animate-pulse w-16" />
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-gray-300 rounded-sm animate-pulse" />
                    <div className="h-3 bg-gray-300 rounded animate-pulse w-24" />
                  </div>
                </div>

                {/* KPI Stats Skeleton */}
                <div className="space-y-6 mb-6">
                  <div>
                    <div className="h-3 bg-gray-300 rounded animate-pulse w-24 mb-2" />
                    <div className="h-8 bg-gray-300 rounded animate-pulse w-20" />
                  </div>
                  <div>
                    <div className="h-3 bg-gray-300 rounded animate-pulse w-28 mb-2" />
                    <div className="h-6 bg-gray-300 rounded animate-pulse w-24" />
                  </div>
                  <div>
                    <div className="h-3 bg-gray-300 rounded animate-pulse w-20 mb-2" />
                    <div className="h-5 bg-gray-300 rounded animate-pulse w-16" />
                  </div>
                </div>

                {/* Vault Illustration Skeleton */}
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-gray-300 rounded-lg animate-pulse" />
                </div>

                {/* Action Buttons Skeleton */}
                <div className="space-y-3">
                  <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse" />
                  <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section Skeleton */}
          <div className="mt-12">
            <div
              className="rounded-2xl border shadow-md"
              style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(8px)",
                borderColor: "rgba(0,0,0,0.06)",
              }}
            >
              {/* Tab Navigation Skeleton */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex space-x-8">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-300 rounded animate-pulse" />
                      <div className="h-4 bg-gray-300 rounded animate-pulse w-16" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tab Content Skeleton */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-300 rounded animate-pulse w-48" />
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-300 rounded animate-pulse w-full" />
                    <div className="h-4 bg-gray-300 rounded animate-pulse w-5/6" />
                    <div className="h-4 bg-gray-300 rounded animate-pulse w-4/5" />
                    <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded animate-pulse w-32" />
                      <div className="h-3 bg-gray-300 rounded animate-pulse w-24" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded animate-pulse w-28" />
                      <div className="h-3 bg-gray-300 rounded animate-pulse w-20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}