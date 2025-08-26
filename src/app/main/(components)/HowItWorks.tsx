'use client';

import React from 'react';
import { Wallet, ArrowUpRight, Zap, Gift } from 'lucide-react';
import { designTokens } from '../../(lib)/designTokens';

const steps = [
  {
    icon: <Wallet className="h-8 w-8" />,
    title: 'Connect & Deposit',
    description: 'Connect your wallet and deposit your assets into our smart vaults',
  },
  {
    icon: <ArrowUpRight className="h-8 w-8" />,
    title: 'Auto-Distribution',
    description: 'Our algorithms automatically distribute across multiple Somnia protocols',
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Earn Points',
    description: 'Accumulate airdrop points from various protocols simultaneously',
  },
  {
    icon: <Gift className="h-8 w-8" />,
    title: 'Claim Rewards',
    description: 'Harvest your rewards and maximize your airdrop potential',
  },
];

export default function HowItWorks() {
  return (
    <section 
      className="py-24"
      style={{
        backgroundColor: designTokens.colors.surface,
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
            How It Works
          </h2>
          <p
            className="max-w-2xl mx-auto"
            style={{
              color: designTokens.colors.textSecondary,
              fontSize: designTokens.typography.scale.body,
            }}
          >
            Four simple steps to maximize your airdrop points across the Somnia ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl border backdrop-blur-sm"
              style={{
                backgroundColor: designTokens.components.card.bg,
                borderColor: designTokens.components.card.border,
                borderRadius: designTokens.radii.xl,
              }}
            >
              <div className="relative mb-6">
                <div
                  className="inline-flex p-4 rounded-2xl"
                  style={{
                    backgroundColor: designTokens.colors.kpiGlass,
                    color: designTokens.colors.accent,
                  }}
                >
                  {step.icon}
                </div>
                <div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: designTokens.colors.accent,
                    color: designTokens.colors.background,
                  }}
                >
                  {index + 1}
                </div>
              </div>

              <h3
                className="font-semibold mb-2"
                style={{
                  color: designTokens.colors.textPrimary,
                  fontSize: designTokens.typography.scale.h3,
                  fontWeight: designTokens.typography.weights.semibold,
                }}
              >
                {step.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{
                  color: designTokens.colors.textSecondary,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}