'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className=" bg-white relative">
      {/* Pink Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)
          `,
          backgroundSize: "100% 100%",
        }}
      />
      
      <footer className="relative z-10 border-t border-pink-200/30 py-12 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-pink-500">
                <span className="font-bold text-sm text-white">S</span>
              </div>
              <span className="font-semibold text-lg text-gray-800">
                Somnia Vault
              </span>
            </div>
            <p className="max-w-md text-gray-600">
              Maximize your airdrop points across the Somnia ecosystem with our automated smart vaults.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-800">
              Platform
            </h3>
            <ul className="space-y-2">
              {['Vaults', 'History', 'Analytics'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/main/${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-800">
              Resources
            </h3>
            <ul className="space-y-2">
              {['Documentation', 'FAQ', 'Support'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-pink-200/30 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Somnia Vault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
}