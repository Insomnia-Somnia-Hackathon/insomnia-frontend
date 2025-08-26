'use client';

import React from 'react';
import { CheckCircle2, Coins, Wallet, DollarSign } from 'lucide-react';

export default function Stepper() {
  const steps = [
    { id: 1, label: 'Click Deposit', icon: <Wallet className="h-5 w-5" /> },
    { id: 2, label: 'Select Token', icon: <Coins className="h-5 w-5" /> },
    { id: 3, label: 'Enter Amount', icon: <DollarSign className="h-5 w-5" /> },
    { id: 4, label: 'Completed', icon: <CheckCircle2 className="h-5 w-5" /> },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="rounded-2xl bg-white shadow-md p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Deposit Process</h2>

        <div className="flex items-center justify-between w-full">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className="flex flex-col items-center flex-1 relative"
            >
              {/* Step circle */}
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-rose-400 bg-white text-rose-500 z-10"
              >
                {step.icon}
              </div>

              {/* Step label */}
              <span className="mt-2 text-sm font-medium text-gray-700">
                {step.label}
              </span>

              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="absolute top-6 left-1/2 w-full">
                  <div className="h-0.5 bg-rose-300 w-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
