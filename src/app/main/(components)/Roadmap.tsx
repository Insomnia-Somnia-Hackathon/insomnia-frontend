'use client';

import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { designTokens } from '../../(lib)/designTokens';

const roadmapItems = [
  {
    title: 'Multi-Protocol Integration',
    status: 'completed',
    description: 'Integrated with 6+ Somnia protocols for diversified point earning',
  },
  {
    title: 'Smart Vault Launch',
    status: 'completed',
    description: 'Launched automated vaults with optimized strategies',
  },
  {
    title: 'Advanced Analytics',
    status: 'in-progress',
    description: 'Real-time point tracking and yield optimization dashboard',
  },
  {
    title: 'Cross-Chain Expansion',
    status: 'planned',
    description: 'Expand to other EVM chains for broader airdrop opportunities',
  },
];

export default function Roadmap() {
  return (
    <section 
      className="py-24"
      style={{
        paddingTop: designTokens.layout.sectionY,
        paddingBottom: designTokens.layout.sectionY,
      }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="font-bold mb-4"
            style={{
              fontSize: designTokens.typography.scale.h2,
              color: designTokens.colors.textPrimary,
              fontWeight: designTokens.typography.weights.bold,
            }}
          >
            Development Roadmap
          </h2>
        </div>

        <div className="space-y-8">
          {roadmapItems.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 pt-1">
                {item.status === 'completed' && (
                  <CheckCircle className="h-6 w-6 text-green-400" />
                )}
                {item.status === 'in-progress' && (
                  <Clock className="h-6 w-6 text-yellow-400" />
                )}
                {item.status === 'planned' && (
                  <Circle className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <div>
                <h3
                  className="font-semibold mb-1"
                  style={{
                    color: designTokens.colors.textPrimary,
                    fontSize: designTokens.typography.scale.h3,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: designTokens.colors.textSecondary,
                    fontSize: designTokens.typography.scale.body,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}