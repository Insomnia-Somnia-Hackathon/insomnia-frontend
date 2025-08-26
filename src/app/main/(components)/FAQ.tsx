'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { designTokens } from '../../(lib)/designTokens';

const faqs = [
  {
    question: 'What are airdrop points and how do I earn them?',
    answer: 'Airdrop points are rewards given by protocols to early users and active participants. Our vaults automatically interact with multiple protocols to maximize your point accumulation across the Somnia ecosystem.',
  },
  {
    question: 'Is my deposited capital safe?',
    answer: 'Yes, we prioritize security through multiple audits, diversified protocol exposure, and automated risk management. Your funds are distributed across audited protocols with emergency withdrawal capabilities.',
  },
  {
    question: 'What are the withdrawal terms?',
    answer: 'Withdrawal terms vary by vault type, ranging from 3-14 days depending on the underlying strategies. This ensures optimal capital deployment while maintaining reasonable liquidity.',
  },
  {
    question: 'How are fees structured?',
    answer: 'We charge a small performance fee on rewards earned, with no deposit fees. Our transparent fee structure ensures you keep most of your returns while supporting continued development.',
  },
  {
    question: 'Can I track my point accumulation?',
    answer: 'Yes, our dashboard provides real-time tracking of your point accumulation across all protocols, estimated APR, and projected airdrop values based on historical data.',
  },
];

export default function FAQ() {
  return (
    <section 
      className="py-24"
      style={{
        backgroundColor: designTokens.colors.surface,
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
            Frequently Asked Questions
          </h2>
          <p
            className="max-w-2xl mx-auto"
            style={{
              color: designTokens.colors.textSecondary,
              fontSize: designTokens.typography.scale.body,
            }}
          >
            Common questions about our airdrop point vaults
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-2xl border px-6"
              style={{
                backgroundColor: designTokens.components.card.bg,
                borderColor: designTokens.components.card.border,
                borderRadius: designTokens.radii.xl,
              }}
            >
              <AccordionTrigger
                className="text-left py-6"
                style={{
                  color: designTokens.colors.textPrimary,
                  fontSize: designTokens.typography.scale.body,
                  fontWeight: designTokens.typography.weights.medium,
                }}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent
                className="pb-6"
                style={{
                  color: designTokens.colors.textSecondary,
                  fontSize: designTokens.typography.scale.body,
                }}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}