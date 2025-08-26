'use client';

import React from 'react';
import { Shield, Zap, Users, Target } from 'lucide-react';
import { designTokens } from '../../(lib)/designTokens';

const differentiators = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Multi-Protocol Safety',
    description: 'Diversified risk across multiple audited protocols with automated rebalancing',
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Optimized Automation',
    description: 'Smart algorithms continuously optimize your point accumulation strategies',
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Community Driven',
    description: 'Built by the community, for the community with transparent governance',
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: 'Maximum Efficiency',
    description: 'Lower gas costs and higher yields through intelligent batching and routing',
  },
];

export default function Differentiators() {
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
            Why Choose Our Vaults
          </h2>
          <p
            className="max-w-2xl mx-auto"
            style={{
              color: designTokens.colors.textSecondary,
              fontSize: designTokens.typography.scale.body,
            }}
          >
            Advanced features that set us apart in the airdrop farming landscape
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border backdrop-blur-sm"
              style={{
                backgroundColor: designTokens.components.card.bg,
                borderColor: designTokens.components.card.border,
                borderRadius: designTokens.radii.xl,
                boxShadow: designTokens.effects.shadowSoft,
              }}
            >
              <div
                className="inline-flex p-3 rounded-xl mb-4"
                style={{
                  backgroundColor: designTokens.colors.kpiGlass,
                  color: designTokens.colors.accent,
                }}
              >
                {item.icon}
              </div>

              <h3
                className="font-semibold mb-3"
                style={{
                  color: designTokens.colors.textPrimary,
                  fontSize: designTokens.typography.scale.h3,
                  fontWeight: designTokens.typography.weights.semibold,
                }}
              >
                {item.title}
              </h3>

              <p
                className="leading-relaxed"
                style={{
                  color: designTokens.colors.textSecondary,
                  fontSize: designTokens.typography.scale.body,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}