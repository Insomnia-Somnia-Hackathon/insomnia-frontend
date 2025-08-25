'use client';
import { ReactNode } from 'react';
import WagmiProviderWrapper from './WagmiProviderWrapper';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProviderWrapper>
      {children}
    </WagmiProviderWrapper>
  );
}
