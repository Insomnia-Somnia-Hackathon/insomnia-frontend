"use client";

import React from "react";
import { designTokens } from "../../../(lib)/designTokens";

export default function VaultCardSkeleton() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border shadow-sm animate-pulse"
      style={{
        backgroundColor: "rgba(255,255,255,0.9)",
        borderColor: "rgba(0,0,0,0.06)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Subtle soft glow kept inside the card only */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 100%, rgba(255,192,203,0.18), transparent 60%), radial-gradient(120% 80% at 100% 0%, rgba(173,216,230,0.16), transparent 60%)",
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-3">
        {/* LEFT: Content Skeleton */}
        <div className="lg:col-span-2 p-6 lg:p-7">
          <div className="mb-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-gray-300 rounded-lg animate-pulse flex-shrink-0" />
              <div className="h-8 bg-gray-300 rounded-lg w-48 animate-pulse" />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-6 bg-gray-300 rounded-full w-20 animate-pulse" />
              <div className="h-6 bg-gray-300 rounded-full w-16 animate-pulse" />
            </div>
          </div>

          <div className="mb-6 space-y-2">
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-300 rounded animate-pulse w-4/5" />
            <div className="h-4 bg-gray-300 rounded animate-pulse w-3/5" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="h-4 bg-gray-300 rounded animate-pulse w-20 mb-2" />
              <div className="flex flex-wrap gap-2">
                <div className="h-6 bg-gray-300 rounded-md animate-pulse w-24" />
                <div className="h-6 bg-gray-300 rounded-md animate-pulse w-20" />
                <div className="h-6 bg-gray-300 rounded-md animate-pulse w-28" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-300 rounded animate-pulse w-16" />
              <div className="flex gap-1">
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: KPI panel Skeleton */}
        <div className="relative lg:col-span-1">
          <div
            className="flex h-full flex-col justify-between border-l p-6 lg:p-7"
            style={{
              background:
                "linear-gradient(180deg, rgba(236,72,153,0.08), rgba(236,72,153,0.03))",
              borderColor: "rgba(0,0,0,0.06)",
              backdropFilter: `blur(${designTokens.effects.blurGlass})`,
            }}
          >
            {/* Somnia Network Header Skeleton */}
            <div className="flex items-center justify-end gap-2 mb-4">
              <div className="h-3 bg-gray-300 rounded animate-pulse w-16" />
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-300 rounded-sm animate-pulse" />
                <div className="h-3 bg-gray-300 rounded animate-pulse w-24" />
              </div>
            </div>

            <div className="flex gap-4">
              {/* KPI Stats Skeleton */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="h-3 bg-gray-300 rounded animate-pulse w-20 mb-1" />
                  <div className="h-8 bg-gray-300 rounded animate-pulse w-16" />
                </div>

                <div>
                  <div className="h-3 bg-gray-300 rounded animate-pulse w-24 mb-1" />
                  <div className="h-6 bg-gray-300 rounded animate-pulse w-20" />
                </div>

                <div>
                  <div className="h-3 bg-gray-300 rounded animate-pulse w-20 mb-1" />
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-16" />
                </div>
              </div>

              {/* Vault Image Skeleton */}
              <div className="flex items-center justify-center mr-15">
                <div className="w-20 h-20 bg-gray-300 rounded-lg animate-pulse" />
              </div>
            </div>

            <div className="pt-4 space-y-3">
              {/* Button Skeletons */}
              <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse" />
              <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}