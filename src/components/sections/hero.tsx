"use client";
import React from "react";
import { motion } from "motion/react";
import { AvatarCirclesImplement } from "./avatar-circles-implement";
import { RippleButton } from "@/components/magicui/ripple-button";
import Link from "next/link";
export const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
       radial-gradient(ellipse 80% 60% at 60% 20%, rgba(175, 109, 255, 0.50), transparent 65%),
        radial-gradient(ellipse 70% 60% at 20% 80%, rgba(255, 100, 180, 0.45), transparent 65%),
        radial-gradient(ellipse 60% 50% at 60% 65%, rgba(255, 235, 170, 0.43), transparent 62%),
        radial-gradient(ellipse 65% 40% at 50% 60%, rgba(120, 190, 255, 0.48), transparent 68%),
        linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
      `,
          backgroundSize: "100% 100%",
        }}
      />
      <div
        className="m-10 absolute inset-0 z-0 rounded-3xl border border-white/50"
        style={{
          backgroundImage:
            "url('/Images/Background/insomnia-background-3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/35 rounded-3xl blur-md" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Insomnia
            <br />
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            <span className="sansation-bold">
              One-click deposit to auto-farm multiple airdrop points.
            </span>
          </p>

          <div className="flex items-center justify-center">
            <AvatarCirclesImplement />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-3"
          >
            <Link href="/main/vaults" target="_blank">
              <RippleButton className="cursor-pointer px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 hover:scale-105 shadow-lg text-lg sansation-bold">
                Deposit Now
              </RippleButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <div className="flex flex-col items-center space-y-2 mb-5">
          <span className="text-sm uppercase tracking-wider">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-white"
          />
        </div>
      </motion.div>
    </div>
  );
};
