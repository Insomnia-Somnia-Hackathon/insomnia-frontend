"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { NavbarButton } from "@/components/ui/resizable-navbar";

export default function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <NavbarButton
                    variant="gradient"
                    className="hidden sm:inline-flex rounded-full px-6"
                    onClick={openConnectModal}
                  >
                    Connect Wallet
                  </NavbarButton>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="rounded-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  {/* Chain Selector with Somnia logo */}
                  <button
                    onClick={openChainModal}
                    className="flex items-center gap-2 rounded-full px-3 py-1.5 shadow-sm hover:opacity-80 transition-opacity"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.28)",
                      color: "#111827",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Image
                      src="/Images/Logo/somnia_logo.png"
                      alt="Somnia Network"
                      width={16}
                      height={16}
                      className="rounded-sm"
                    />
                    <span className="text-sm">{chain.name}</span>
                  </button>

                  {/* Account Button with Balance */}
                  <button
                    onClick={openAccountModal}
                    className="cursor-pointer flex items-center gap-2 rounded-full px-4 py-2 h-10 shadow-sm hover:opacity-80 transition-opacity"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      color: "#111827",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div className="text-sm">
                      <div className="font-medium">{account.displayName}</div>
                      {account.displayBalance && (
                        <div className="text-xs text-gray-600">
                          {account.displayBalance}
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
