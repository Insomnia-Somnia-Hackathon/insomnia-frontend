'use client';
import { ReactNode } from 'react';
import WagmiProviderWrapper from './WagmiProviderWrapper';
import QueryProvider from './QueryProvider';
import RainbowKitProviderWrapper from './RainbowKitProviderWrapper';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProviderWrapper>
      <QueryProvider>
        <RainbowKitProviderWrapper>
          {children}
        </RainbowKitProviderWrapper>
      </QueryProvider>
    </WagmiProviderWrapper>
  );
}
