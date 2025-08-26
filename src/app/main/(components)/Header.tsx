'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

export default function Header() {
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Pink Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)
          `,
          backgroundSize: "100% 100%",
        }}
      />
      
      <header className="relative z-50 border-b border-pink-200/30 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-pink-500">
                <span className="font-bold text-sm text-white">S</span>
              </div>
              <span className="font-semibold text-lg text-gray-800">
                Somnia Vault
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/main"
              className="text-sm font-medium transition-colors hover:text-pink-600 text-gray-600"
            >
              Home
            </Link>
            <Link 
              href="/main/vaults"
              className="text-sm font-medium transition-colors hover:text-pink-600 text-gray-600"
            >
              Vaults
            </Link>
            <Link 
              href="/main/history"
              className="text-sm font-medium transition-colors hover:text-pink-600 text-gray-600"
            >
              History
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-colors">
              <Wallet className="h-4 w-4" />
              <span>Connect Wallet</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
    </div>
  );
}