"use client";

import React from "react";

export default function HistoryPageSkeleton() {
  return (
    <div
      className="relative min-h-screen w-full"
      style={{
        backgroundImage: 'url(/Images/Background/vault-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Strong-but-soft overlay so content pops */}
      <div className="pointer-events-none absolute inset-0 bg-white/45 backdrop-blur-xl" />

      <section className="relative z-10 py-12">
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex-1">
              <div className="h-10 bg-gray-300 rounded-lg w-80 animate-pulse mb-3" />
              <div className="h-6 bg-gray-300 rounded-lg w-96 animate-pulse" />
            </div>
            {/* Filter Pills Skeleton */}
            <div className="flex gap-2">
              <div className="h-10 bg-gray-300 rounded-full w-16 animate-pulse" />
              <div className="h-10 bg-gray-300 rounded-full w-20 animate-pulse" />
              <div className="h-10 bg-gray-300 rounded-full w-24 animate-pulse" />
              <div className="h-10 bg-gray-300 rounded-full w-16 animate-pulse" />
            </div>
          </div>

          {/* Stats Row Skeleton */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl border shadow-sm animate-pulse"
                style={{
                  backgroundColor: "rgba(255,255,255,0.75)",
                  borderColor: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-70"
                  style={{
                    backgroundImage: `radial-gradient(120% 90% at 12% 100%, rgba(236,72,153,0.12), transparent 60%)`,
                  }}
                />
                <div className="relative z-10 p-6">
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-24 mb-3" />
                  <div className="h-8 bg-gray-300 rounded animate-pulse w-20" />
                </div>
              </div>
            ))}
          </div>

          {/* Transactions Table Skeleton */}
          <div className="relative overflow-hidden rounded-2xl border shadow-sm">
            {/* glass base */}
            <div className="absolute inset-0 rounded-2xl bg-white/75 backdrop-blur-xl ring-1 ring-white/50" />
            {/* very soft glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-70"
              style={{
                backgroundImage:
                  'radial-gradient(120% 90% at 12% 100%, rgba(236,72,153,0.12), transparent 60%), radial-gradient(120% 90% at 88% 0%, rgba(14,165,233,0.10), transparent 60%)',
              }}
            />

            <div className="relative z-10">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/60 text-left">
                      {['Date', 'Action', 'Vault', 'Amount', 'Transaction'].map((th) => (
                        <th key={th} className="px-6 py-4">
                          <div className="h-4 bg-gray-300 rounded animate-pulse w-16" />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <tr key={i} className="border-b border-white/30">
                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-300 rounded animate-pulse w-24" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-6 bg-gray-300 rounded-full animate-pulse w-20" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-300 rounded animate-pulse w-32" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-300 rounded animate-pulse w-20" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-300 rounded animate-pulse w-16" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}