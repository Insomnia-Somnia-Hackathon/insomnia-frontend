"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";
import { TrendUp, CurrencyCircleDollar } from "phosphor-react";

interface FarmingItem {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let farmingNotifications = [
  {
    name: "Farming airdrop in Somnia testnet",
    description: "Auto-deposited 100 USDC to vault",
    time: "2m ago",
    icon: "🚀",
    color: "#8B5CF6",
  },
  {
    name: "Farming airdrop in Somnia ecosystem",
    description: "Optimized yield across 3 protocols",
    time: "5m ago",
    icon: "🌟",
    color: "#EC4899",
  },
  {
    name: "Farming airdrop in Somnia testnet",
    description: "Earned 2.5% APY from liquidity mining",
    time: "8m ago",
    icon: "💎",
    color: "#3B82F6",
  },
  {
    name: "Farming airdrop in Somnia ecosystem",
    description: "Compounded rewards automatically",
    time: "12m ago",
    icon: "⚡",
    color: "#10B981",
  },
  {
    name: "Farming airdrop in Somnia testnet",
    description: "New airdrop points accumulated",
    time: "15m ago",
    icon: "🎯",
    color: "#F59E0B",
  },
  {
    name: "Farming airdrop in Somnia ecosystem", 
    description: "Portfolio rebalanced for maximum yield",
    time: "18m ago",
    icon: "🔥",
    color: "#EF4444",
  },
];

farmingNotifications = Array.from({ length: 3 }, () => farmingNotifications).flat();

const FarmingNotification = ({ name, description, icon, color, time }: FarmingItem) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function FarmingActivitySection({
  className,
}: {
  className?: string;
}) {
  return (
    <div className="min-h-screen w-full relative">
      {/* Violet Abyss */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #2b092b 100%)",
        }}
      />
      {/* Your Content/Components */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Live Farming Activity
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Real-time activity from our automated farming vaults. 
              Watch as users deposit and earn across multiple protocols effortlessly.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendUp className="text-white text-lg" weight="bold" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Auto Optimization</h3>
                  <p className="text-gray-400 text-sm">Smart routing across protocols</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <CurrencyCircleDollar className="text-white text-lg" weight="bold" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Instant Rewards</h3>
                  <p className="text-gray-400 text-sm">Immediate point accumulation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Animated List */}
          <div
            className={cn(
              "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
              className,
            )}
          >
            <AnimatedList>
              {farmingNotifications.map((item, idx) => (
                <FarmingNotification {...item} key={idx} />
              ))}
            </AnimatedList>

          </div>
        </div>
      </div>
      </section>
    </div>
  );
}