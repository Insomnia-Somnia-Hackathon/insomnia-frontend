'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';
import { designTokens } from '../../(lib)/designTokens';
import { formatCurrency, formatPercent } from '../../(lib)/utils';
import { getKpiStats } from '../../(lib)/vaultsData';
import KPIStat from './KPIStat';

export default function Hero() {
  const kpiStats = getKpiStats();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/Images/Background/vault-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: `${designTokens.colors.background}CC`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1
            className="font-bold mb-6 leading-tight"
            style={{
              fontSize: designTokens.typography.scale.h1,
              color: designTokens.colors.textPrimary,
              fontFamily: designTokens.typography.fontHead,
              fontWeight: designTokens.typography.weights.bold,
            }}
          >
            Maximize Your{' '}
            <span style={{ color: designTokens.colors.accent }}>
              Airdrop Points
            </span>
            <br />
            Across Somnia DeFi
          </h1>

          <p
            className="text-xl mb-8 leading-relaxed max-w-2xl mx-auto"
            style={{
              color: designTokens.colors.textSecondary,
              fontSize: designTokens.typography.scale.body,
            }}
          >
            Deposit once, earn everywhere. Our smart vaults automatically distribute your assets 
            across multiple Somnia protocols to maximize your airdrop point accumulation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="flex items-center space-x-2 px-8 py-4 text-lg font-semibold"
              style={{
                backgroundColor: designTokens.components.button.primary.bg,
                color: designTokens.components.button.primary.text,
                borderRadius: designTokens.components.button.primary.radius,
                boxShadow: designTokens.components.button.primary.shadow,
              }}
            >
              <span>Start Earning</span>
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-medium"
              style={{
                backgroundColor: designTokens.components.button.secondary.bg,
                color: designTokens.components.button.secondary.text,
                borderColor: designTokens.colors.border,
                borderRadius: designTokens.components.button.secondary.radius,
              }}
            >
              Learn More
            </Button>
          </div>

          {/* KPI Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KPIStat
              icon={<TrendingUp className="h-6 w-6" />}
              label="Total TVL"
              value={formatCurrency(kpiStats.totalTVL)}
            />
            <KPIStat
              icon={<Shield className="h-6 w-6" />}
              label="Active Protocols"
              value={kpiStats.activeProtocols.toString()}
            />
            <KPIStat
              icon={<Zap className="h-6 w-6" />}
              label="Avg Est. Points APR"
              value={formatPercent(kpiStats.avgPointsAPR)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}