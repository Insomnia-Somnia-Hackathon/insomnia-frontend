"use client";

import { TextReveal } from "@/components/magicui/text-reveal";

export function TextRevealClosing() {
  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #350136 100%)",
        }}
      />
      <section className="relative z-10">
        <TextReveal className="text-center">
          Join thousands of DeFi users who trust Insomnia Protocol to maximize
          their yields. Start farming with one click today and watch your
          portfolio grow automatically across Somnia Network.
          
        </TextReveal>
  {/* Button Deposit Now removed as requested */}
     
      </section>
    </div>
  );
}
