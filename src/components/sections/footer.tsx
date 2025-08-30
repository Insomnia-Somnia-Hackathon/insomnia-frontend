"use client";
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-pink-400/20 to-pink-600/30 border-t border-pink-500/40 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/Images/Logo/insomnia-logo.jpg"
                alt="Insomnia Logo"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-bold text-xl text-white">Insomnia</span>
            </div>
            <p className="text-white text-sm leading-relaxed max-w-md">
              Automated DeFi farming protocol on Somnia Network. One-click deposits, 
              multi-protocol farming, and maximized airdrop rewards.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Protocol</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-white transition-colors text-sm">Features</a></li>
              <li><a href="#" className="text-white hover:text-white transition-colors text-sm">How it Works</a></li>
              <li><a href="#" className="text-white hover:text-white transition-colors text-sm">Security</a></li>
              <li><a href="#" className="text-white hover:text-white transition-colors text-sm">Docs</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-white transition-colors text-sm">Discord</a></li>
              <li><a href="#" className="text-white hover:text-white transition-colors text-sm">Twitter</a></li>
              <li><a href="#" className="text-white hover:text-white transition-colors text-sm">GitHub</a></li>
              <li><a href="#" className="text-white hover:text-white transition-colors text-sm">Medium</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 Insomnia Protocol. Built on Somnia Network.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};