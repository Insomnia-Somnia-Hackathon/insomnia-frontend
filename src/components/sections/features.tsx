"use client";
import React from "react";
import { motion } from "motion/react";
import SpotlightCard from "@/components/ui/spotlight-card";
import { 
  Bank, 
  LinkSimple, 
  TrendUp, 
  ChartBar, 
  Lightning, 
  ShieldCheck 
} from "phosphor-react";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Smart Vault Technology",
      description: "Our intelligent vault system automatically allocates your funds across multiple DeFi protocols to maximize yield opportunities and airdrop point accumulation.",
      icon: Bank,
      spotlightColor: "rgba(147, 51, 234, 0.2)" as const,
    },
    {
      title: "Multi-Protocol Integration", 
      description: "Seamlessly interact with leading DeFi protocols on Somnia Network. Our system handles complex routing and optimization automatically.",
      icon: LinkSimple,
      spotlightColor: "rgba(236, 72, 153, 0.2)" as const,
    },
    {
      title: "Automated Yield Optimization",
      description: "Machine learning algorithms continuously monitor and rebalance your positions to ensure maximum returns while maintaining optimal risk levels.",
      icon: TrendUp,
      spotlightColor: "rgba(59, 130, 246, 0.2)" as const,
    },
    {
      title: "Real-Time Analytics",
      description: "Track your performance with comprehensive dashboards showing yield farming progress, airdrop point accumulation, and portfolio health.",
      icon: ChartBar,
      spotlightColor: "rgba(16, 185, 129, 0.2)" as const,
    },
    {
      title: "Gas Optimization",
      description: "Advanced batch processing and smart contract optimization reduce gas costs by up to 70% compared to manual multi-protocol farming.",
      icon: Lightning,
      spotlightColor: "rgba(245, 158, 11, 0.2)" as const,
    },
    {
      title: "Risk Management",
      description: "Built-in safety mechanisms including emergency withdrawals, automated risk assessment, and protocol health monitoring for maximum security.",
      icon: ShieldCheck,
      spotlightColor: "rgba(239, 68, 68, 0.2)" as const,
    },
  ];

  return (
    <div className="min-h-screen w-full relative">
      {/* Aurora Dream Diagonal Flow */}
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
    
      {/* Your Content/Components */}
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
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover the advanced technology behind Insomnia's automated DeFi farming platform
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">
          {/* Large Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-3 md:row-span-2"
          >
            <SpotlightCard 
              className="h-full bg-white/20 border-purple-200/30 backdrop-blur-sm"
              spotlightColor={features[0].spotlightColor}
            >
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="mb-6">
                  {React.createElement(features[0].icon, { className: "text-5xl text-gray-800", weight: "bold" })}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {features[0].title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {features[0].description}
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Medium Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-3 md:row-span-1"
          >
            <SpotlightCard 
              className="h-full bg-white/20 border-purple-200/30 backdrop-blur-sm"
              spotlightColor={features[1].spotlightColor}
            >
              <div className="relative z-10 h-full flex items-center">
                <div className="flex items-center space-x-4">
                  {React.createElement(features[1].icon, { className: "text-3xl text-gray-800 flex-shrink-0", weight: "bold" })}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                      {features[1].title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {features[1].description.substring(0, 120)}...
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-1"
          >
            <SpotlightCard 
              className="h-full bg-white/20 border-purple-200/30 backdrop-blur-sm"
              spotlightColor={features[2].spotlightColor}
            >
              <div className="relative z-10 h-full flex flex-col justify-center text-center">
                <div className="mb-3">
                  {React.createElement(features[2].icon, { className: "text-3xl text-gray-800 mx-auto", weight: "bold" })}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {features[2].title}
                </h3>
                <p className="text-gray-700 text-sm">
                  {features[2].description.substring(0, 80)}...
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="md:col-span-1 md:row-span-1"
          >
            <SpotlightCard 
              className="h-full bg-white/20 border-purple-200/30 backdrop-blur-sm"
              spotlightColor={features[3].spotlightColor}
            >
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                {React.createElement(features[3].icon, { className: "text-4xl text-gray-800 mb-3", weight: "bold" })}
                <h3 className="text-sm font-semibold text-gray-800">
                  {features[3].title}
                </h3>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Small Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-1"
          >
            <SpotlightCard 
              className="h-full bg-white/20 border-purple-200/30 backdrop-blur-sm"
              spotlightColor={features[4].spotlightColor}
            >
              <div className="relative z-10 h-full flex items-center">
                <div className="flex items-center space-x-3">
                  {React.createElement(features[4].icon, { className: "text-3xl text-gray-800 flex-shrink-0", weight: "bold" })}
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-800">
                      {features[4].title}
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Save up to 70% on gas costs
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-1"
          >
            <SpotlightCard 
              className="h-full bg-white/20 border-purple-200/30 backdrop-blur-sm"
              spotlightColor={features[5].spotlightColor}
            >
              <div className="relative z-10 h-full flex items-center">
                <div className="flex items-center space-x-3">
                  {React.createElement(features[5].icon, { className: "text-3xl text-gray-800 flex-shrink-0", weight: "bold" })}
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-800">
                      {features[5].title}
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Built-in safety mechanisms
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

      </div>
      </section>
    </div>
  );
};