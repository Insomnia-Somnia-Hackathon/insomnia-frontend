"use client";

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { designTokens } from "../../../(lib)/designTokens";

interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance: number;
}

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  vaultName: string;
}

const AVAILABLE_TOKENS: Token[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "/Images/tokens/eth.png",
    balance: 2.5
  },
  {
    symbol: "USDC",
    name: "USD Coin", 
    icon: "/Images/tokens/usdc.png",
    balance: 1000.0
  },
  {
    symbol: "STT",
    name: "Somnia Token",
    icon: "/Images/Logo/somnia_logo.png",
    balance: 500.0
  }
];

export default function Popup({ isOpen, onClose, vaultName }: PopupProps) {
  const [selectedToken, setSelectedToken] = useState<Token>(AVAILABLE_TOKENS[0]);
  const [amount, setAmount] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDeposit = () => {
    // Handle deposit logic here
    console.log("Depositing", amount, selectedToken.symbol, "to", vaultName);
    onClose();
  };

  const handleMaxClick = () => {
    setAmount(selectedToken.balance.toString());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Modal */}
          <motion.div 
            className="relative w-full max-w-md mx-4 rounded-3xl border shadow-2xl overflow-hidden"
            style={{
              backgroundColor: "rgba(255,255,255,0.95)",
              borderColor: "rgba(236,72,153,0.2)",
              backdropFilter: "blur(20px)",
            }}
            initial={{ 
              scale: 0.7, 
              opacity: 0,
              y: 50 
            }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: 0 
            }}
            exit={{ 
              scale: 0.7, 
              opacity: 0,
              y: 50 
            }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3
            }}
          >
        {/* Pink gradient header */}
        <div
          className="px-6 py-4 relative"
          style={{
            background: "linear-gradient(135deg, rgba(236,72,153,0.1), rgba(255,192,203,0.1))",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(120% 80% at 20% 100%, rgba(255,192,203,0.15), transparent 60%)",
            }}
          />
          <div className="relative flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Deposit to {vaultName}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Token Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Token
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between p-4 border rounded-2xl bg-white hover:bg-slate-50 transition-colors"
                style={{
                  borderColor: "rgba(236,72,153,0.2)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-slate-700">
                      {selectedToken.symbol.slice(0, 2)}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-slate-900">{selectedToken.symbol}</div>
                    <div className="text-xs text-slate-500">{selectedToken.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">
                    Balance: {selectedToken.balance}
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    className="absolute top-full left-0 right-0 mt-1 border rounded-2xl bg-white shadow-lg z-10"
                    style={{
                      borderColor: "rgba(236,72,153,0.2)",
                    }}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                  {AVAILABLE_TOKENS.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => {
                        setSelectedToken(token);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-slate-700">
                          {token.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-slate-900">{token.symbol}</div>
                        <div className="text-xs text-slate-500">{token.name}</div>
                      </div>
                      <span className="text-xs text-slate-500">
                        {token.balance}
                      </span>
                    </button>
                  ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          </div>

          {/* Amount Input */}
          <div className="m-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full p-4 border rounded-2xl bg-white focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: "rgba(236,72,153,0.2)",
                }}
              />
              <button
                onClick={handleMaxClick}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium rounded-full transition-colors"
                style={{
                  backgroundColor: "rgba(236,72,153,0.1)",
                  color: "#ec4899",
                }}
              >
                MAX
              </button>
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Available: {selectedToken.balance} {selectedToken.symbol}
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div 
            className="flex gap-3 pt-2 m-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full h-12 font-medium"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#ec4899",
                  borderColor: "rgba(236,72,153,0.3)",
                  borderRadius: designTokens.components.button.secondary.radius,
                }}
              >
                Cancel
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                onClick={handleDeposit}
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full h-12 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "#ec4899",
                  color: "#ffffff",
                  borderRadius: designTokens.components.button.primary.radius,
                  boxShadow: "0 10px 22px rgba(236,72,153,0.25)",
                }}
              >
                Deposit
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}