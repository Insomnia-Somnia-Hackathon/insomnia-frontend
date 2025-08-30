"use client";

import React from "react";
import { Feather, Target, CircleAlert, FileText } from "lucide-react";
import { motion } from "framer-motion";

type TabId = "overview" | "strategies" | "risks" | "docs";

interface VaultTabsProps {
  activeTab: TabId;
  setActiveTab: (t: TabId) => void;
}

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <Target className="h-4 w-4" />,
  },
  {
    id: "strategies",
    label: "Strategies",
    icon: <Feather className="h-4 w-4" />,
  },
  { id: "risks", label: "Risks", icon: <CircleAlert className="h-4 w-4" /> },
  { id: "docs", label: "Docs", icon: <FileText className="h-4 w-4" /> },
];

export default function VaultTabs({ activeTab, setActiveTab }: VaultTabsProps) {
  return (
    <div className="mb-8">
      <div className="flex gap-2 overflow-x-auto py-2 px-4">
        {TABS.map((tab, index) => {
          const active = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.3, 
                ease: "easeOut" 
              }}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1, ease: "easeInOut" }
              }}
              style={{
                backgroundColor: active ? "#ec4899" : "rgba(255,255,255,0.9)",
                color: active ? "#ffffff" : "#334155",
                border: `1px solid ${
                  active ? "rgba(236,72,153,0.55)" : "rgba(15,23,42,0.06)"
                }`,
                boxShadow: active
                  ? "0 10px 20px rgba(236,72,153,0.25)"
                  : "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              {/* Background glow animation for active tab */}
              {active && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, rgba(236,72,153,0.8), rgba(219,39,119,0.8))",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              {/* Content */}
              <div className="relative z-10 flex items-center gap-2">
                <motion.div
                  animate={{ 
                    rotate: active ? [0, 360] : 0,
                    scale: active ? [1, 1.2, 1] : 1
                  }}
                  transition={{ 
                    duration: active ? 0.6 : 0.2,
                    ease: "easeInOut" 
                  }}
                >
                  {tab.icon}
                </motion.div>
                <motion.span
                  animate={{ 
                    fontWeight: active ? 600 : 500,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {tab.label}
                </motion.span>
              </div>

              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0 }}
                whileHover={{ 
                  opacity: active ? 0 : 0.1,
                  transition: { duration: 0.2 }
                }}
                style={{
                  background: "linear-gradient(90deg, rgba(236,72,153,0.3), rgba(219,39,119,0.3))",
                }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
