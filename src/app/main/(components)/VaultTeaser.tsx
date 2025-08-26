'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { designTokens } from '../../(lib)/designTokens';
import { vaults } from '../../(lib)/mockData';
import VaultCard from './VaultCard';

export default function VaultTeaser() {
  const topVaults = vaults.slice(0, 3);

  return (
    <section 
      className="py-24"
      style={{
        paddingTop: designTokens.layout.sectionY,
        paddingBottom: designTokens.layout.sectionY,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="font-bold mb-4"
            style={{
              fontSize: designTokens.typography.scale.h2,
              color: designTokens.colors.textPrimary,
              fontWeight: designTokens.typography.weights.bold,
            }}
          >
            Top Performing Vaults
          </h2>
          <p
            className="max-w-2xl mx-auto"
            style={{
              color: designTokens.colors.textSecondary,
              fontSize: designTokens.typography.scale.body,
            }}
          >
            Discover our highest-yielding vaults optimized for maximum airdrop point accumulation
          </p>
        </div>

        <div 
          className="grid grid-cols-1 gap-8 mb-12"
          style={{ gap: designTokens.layout.gridGap }}
        >
          {topVaults.map((vault) => (
            <VaultCard key={vault.slug} vault={vault} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/vaults">
            <Button
              size="lg"
              className="flex items-center space-x-2 px-8 py-4 text-lg font-medium"
              style={{
                backgroundColor: designTokens.components.button.secondary.bg,
                color: designTokens.components.button.secondary.text,
                border: designTokens.components.button.secondary.border,
                borderRadius: designTokens.components.button.secondary.radius,
              }}
            >
              <span>View All Vaults</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}