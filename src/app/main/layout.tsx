import React from 'react';
import { Metadata } from 'next';
import Header from './(components)/Header';
import Footer from './(components)/Footer';
import { designTokens } from '../(lib)/designTokens';

export const metadata: Metadata = {
  title: {
    default: 'Somnia Airdrop Points Vault',
    template: '%s | Somnia Airdrop Points Vault',
  },
  description: 'Maximize your airdrop points across the Somnia ecosystem with automated smart vaults. Deposit once, earn everywhere.',
  keywords: ['airdrop', 'points', 'vault', 'Somnia', 'DeFi', 'yield farming'],
  authors: [{ name: 'Somnia Airdrop Points Vault Team' }],
  creator: 'Somnia Airdrop Points Vault',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Somnia Airdrop Points Vault',
    description: 'Maximize your airdrop points across the Somnia ecosystem with automated smart vaults.',
    siteName: 'Somnia Airdrop Points Vault',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Somnia Airdrop Points Vault',
    description: 'Maximize your airdrop points across the Somnia ecosystem with automated smart vaults.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      className="min-h-screen custom-scrollbar"
      style={{
        backgroundColor: designTokens.colors.background,
        color: designTokens.colors.textPrimary,
        fontFamily: designTokens.typography.fontBody,
      }}
    >
      <main className="relative" role="main">{children}</main>
      <Footer />
    </div>
  );
}