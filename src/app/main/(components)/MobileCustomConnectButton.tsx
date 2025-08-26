"use client";

import React from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from "next/image";
import { NavbarButton } from "@/components/ui/resizable-navbar";
import { ChevronDown } from "lucide-react";

interface MobileCustomConnectButtonProps {
  onClose: () => void;
}

export default function MobileCustomConnectButton({ onClose }: MobileCustomConnectButtonProps) {
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
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div className="mt-2 flex flex-col gap-2">
                    <button
                      className="flex w-full items-center justify-between rounded-full px-4 py-2"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.28)",
                        color: "#111827",
                        backdropFilter: "blur(8px)",
                      }}
                      disabled
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src="/Images/Logo/somnia_logo.png"
                          alt="Somnia Network"
                          width={16}
                          height={16}
                          className="rounded-sm"
                        />
                        <span>Somnia Network</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    <NavbarButton
                      variant="gradient"
                      className="w-full rounded-full"
                      onClick={() => {
                        openConnectModal();
                        onClose();
                      }}
                    >
                      Connect Wallet
                    </NavbarButton>
                  </div>
                );
              }

              if (chain.unsupported) {
                return (
                  <div className="mt-2">
                    <button 
                      onClick={() => {
                        openChainModal();
                        onClose();
                      }}
                      className="w-full rounded-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200"
                    >
                      Wrong network - Click to change
                    </button>
                  </div>
                );
              }

              return (
                <div className="mt-2 flex flex-col gap-2">
                  {/* Chain Selector */}
                  <button
                    onClick={() => {
                      openChainModal();
                      onClose();
                    }}
                    className="flex w-full items-center justify-between rounded-full px-4 py-2"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.28)",
                      color: "#111827",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src="/Images/Logo/somnia_logo.png"
                        alt="Somnia Network"
                        width={16}
                        height={16}
                        className="rounded-sm"
                      />
                      <span>{chain.name}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Account Button */}
                  <button
                    onClick={() => {
                      openAccountModal();
                      onClose();
                    }}
                    className="w-full rounded-full px-4 py-3"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      color: "#111827",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-medium">
                          {account.displayName}
                        </div>
                        {account.displayBalance && (
                          <div className="text-sm text-gray-600">
                            {account.displayBalance}
                          </div>
                        )}
                      </div>
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