"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { cn } from "../../(lib)/utils";
import { designTokens } from "../../(lib)/designTokens";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CustomConnectButton from "./CustomConnectButton";

export default function SecondaryNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { label: "Vaults", href: "/main/vaults" },
    { label: "History", href: "/main/history" },
  ] as const;

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <div className="relative w-full">
      <Navbar className="fixed top-4 z-40 w-full px-4">
        {/* DESKTOP */}
        <NavBody
          className="h-14 rounded-full shadow-md px-6 flex items-center"
        >
          <div className="flex w-full items-center justify-between">
            {/* Left: Logo + Tabs */}
            <div className="flex items-center gap-6">
              <NavbarLogo />
              <nav className="hidden md:flex items-center gap-8">
                {tabs.map((tab) => (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={cn(
                      "relative py-2 text-sm font-medium transition-colors text-black hover:text-gray-500"
                    )}
                    // style={{
                    //   color: isActive(tab.href)
                    //     ? designTokens.components.tabs.item.activeText
                    //     : designTokens.components.tabs.item.text,
                    // }}
                  >
                    {tab.label}
                    <span
                      className="absolute left-0 right-0 -bottom-2 h-[2px] rounded-full"
                      style={{
                        background: isActive(tab.href)
                          ? designTokens.components.tabs.indicator.bg
                          : "transparent",
                      }}
                    />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right: Connect Button */}
            <div className="flex items-center gap-3">
              <CustomConnectButton />
            </div>
          </div>
        </NavBody>

        {/* MOBILE */}
        <MobileNav className="rounded-none">
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex w-full flex-col gap-3">
              {tabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium"
                  style={{
                    color: isActive(tab.href)
                      ? designTokens.components.tabs.item.activeText
                      : designTokens.components.tabs.item.text,
                  }}
                >
                  {tab.label}
                </Link>
              ))}

              <div className="mt-2">
                <button className="w-full rounded-full px-6 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-sm">
                  Connect Wallet
                </button>
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
