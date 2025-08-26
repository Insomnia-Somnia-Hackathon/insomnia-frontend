"use client";
import React from "react";
import { motion } from "motion/react";
import SpotlightCard from "@/components/ui/spotlight-card";
import { Bank, LinkSimple, TrendUp, ShieldCheck } from "phosphor-react";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Smart Airdrop Vaults",
      description:
        "Deposit once and let our smart vaults auto-distribute across protocols. Earn farming rewards and maximize airdrop points without the hassle.",
      icon: Bank,
      spotlightColor: "rgba(147, 51, 234, 0.2)" as const,
    },
    {
      title: "Farm Across the Somnia Ecosystem",
      description:
        "One ecosystem, endless opportunities. Collect airdrop points from Somnia’s native protocols without ever leaving the network.",
      icon: LinkSimple,
      spotlightColor: "rgba(236, 72, 153, 0.2)" as const,
    },
    {
      title: "Maximize Your Points",
      description:
        "Let automation work for you. Earn points even while you sleep.",
      icon: TrendUp,
      spotlightColor: "rgba(59, 130, 246, 0.2)" as const,
    },
    {
      title: "Safety for Airdroppers",
      icon: ShieldCheck,
      spotlightColor: "rgba(239, 68, 68, 0.2)" as const,
    },
  ];

  return (
    <div className="min-h-screen w-full relative">
      {/* Background Aurora */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 5% 40%, rgba(175, 109, 255, 0.48), transparent 67%),
            radial-gradient(ellipse 70% 60% at 45% 45%, rgba(255, 100, 180, 0.41), transparent 67%),
            radial-gradient(ellipse 62% 52% at 83% 76%, rgba(255, 235, 170, 0.44), transparent 63%),
            radial-gradient(ellipse 60% 48% at 75% 20%, rgba(120, 190, 255, 0.36), transparent 66%),
            linear-gradient(45deg, #f7eaff 0%, #fde2ea 100%)
          `,
        }}
      />

      {/* Content */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Helping Airdroppers Farm Points Easily
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Insomnia makes it effortless for hunters and farmers to collect
              airdrop points across multiple protocols — automated, optimized,
              and secure.
            </p>
          </motion.div>

          {/* Grid Features */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={
                  idx === 0
                    ? "md:col-span-3 md:row-span-2"
                    : idx === 1
                    ? "md:col-span-3 md:row-span-1"
                    : idx === 2
                    ? "md:col-span-2 md:row-span-1"
                    : "md:col-span-1 md:row-span-1"
                }
              >
                <SpotlightCard
                  className="h-full bg-white/20 border-purple-200/30 backdrop-blur-sm"
                  spotlightColor={feature.spotlightColor}
                >
                  <div className="relative z-10 h-full flex flex-col justify-center text-center md:text-left items-center md:items-start p-4">
                    {React.createElement(feature.icon, {
                      className:
                        "text-4xl md:text-5xl text-gray-800 mb-4 mx-auto md:mx-0",
                      weight: "bold",
                    })}
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
