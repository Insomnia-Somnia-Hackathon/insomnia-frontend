"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { RippleButton } from "@/components/magicui/ripple-button";
import { useState } from "react";
import Link from "next/link";

export function InsomniaNavbar() {
  // const navItems = [
  //   {
  //     name: "Features",
  //     link: "#features",
  //   },
  //   {
  //     name: "How it Works",
  //     link: "#how-it-works",
  //   },
  //   {
  //     name: "Protocols",
  //     link: "#protocols",
  //   },
  //   {
  //     name: "Docs",
  //     link: "#docs",
  //   },
  // ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar className="fixed top-0 mt-15">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          {/* <NavItems items={navItems} /> */}
          <div className="flex items-center gap-4">
            <Link href="/main/vaults" target="_blank">
              <RippleButton className="bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
                Launch App
              </RippleButton>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {/* {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))} */}
            <div className="flex w-full flex-col gap-4">
              <Link href="/main/vaults" target="_blank" onClick={() => setIsMobileMenuOpen(false)}>
                <RippleButton className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
                  Launch App
                </RippleButton>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
