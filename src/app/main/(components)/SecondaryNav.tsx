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

            {/* Right: Network Selector + CTA */}
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 rounded-full px-4 py-1.5 shadow-sm"
                style={{
                  backgroundColor: "rgba(255,255,255,0.28)",
                  color: "#111827",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="text-sm">Somnia Network</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <NavbarButton variant="gradient" className="hidden sm:inline-flex rounded-full px-6">
                Connect Wallet
              </NavbarButton>
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

              <div className="mt-2 flex flex-col gap-2">
                <button
                  className="flex w-full items-center justify-between rounded-full px-4 py-2"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.28)",
                    color: "#111827",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span>Somnia Network</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                <NavbarButton
                  variant="gradient"
                  className="w-full rounded-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Connect Wallet
                </NavbarButton>
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
