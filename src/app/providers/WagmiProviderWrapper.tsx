'use client';

import { ReactNode } from 'react';
import { WagmiProvider, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

const wagmiConfig = getDefaultConfig({
  appName: 'Insomnia',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});

export default function WagmiProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
  );
}
