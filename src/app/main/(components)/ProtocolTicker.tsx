'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { designTokens } from '../../(lib)/designTokens';
import { formatPercent } from '../../(lib)/utils';
import { protocols } from '../../(lib)/mockData';

export default function ProtocolTicker() {
  return (
    <section 
      className="py-12 border-b overflow-hidden"
      style={{
        backgroundColor: designTokens.colors.surface,
        borderColor: designTokens.colors.border,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          className="text-center text-lg font-medium mb-8"
          style={{ color: designTokens.colors.textSecondary }}
        >
          Integrated Protocols
        </h2>

        <div className="relative">
          <div className="flex animate-scroll space-x-8">
            {[...protocols, ...protocols].map((protocol, index) => (
              <div
                key={`${protocol.id}-${index}`}
                className="flex-shrink-0 flex items-center space-x-4 p-4 rounded-xl border"
                style={{
                  backgroundColor: designTokens.components.card.bg,
                  borderColor: designTokens.components.card.border,
                  minWidth: '250px',
                }}
              >
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={protocol.imageUrl}
                    alt={protocol.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span
                      className="font-medium text-sm"
                      style={{ color: designTokens.colors.textPrimary }}
                    >
                      {protocol.name}
                    </span>
                    <Badge
                      className={`text-xs px-2 py-0.5 ${
                        protocol.status === 'Active'
                          ? 'bg-green-400/10 text-green-400'
                          : 'bg-yellow-400/10 text-yellow-400'
                      }`}
                    >
                      {protocol.status}
                    </Badge>
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: designTokens.colors.textSecondary }}
                  >
                    Est. {formatPercent(protocol.estPointsApr)} APR
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
}