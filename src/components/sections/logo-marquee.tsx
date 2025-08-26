"use client";
import React from "react";

const partners = [
  {
    name: "Somnia Network",
    logo: "/Images/Logo/somnia_logo.png",
  },
  {
    logo: "/Images/Logo/wagmi-logo.svg",
  },
  {
    name: "Somnia Network",
    logo: "/Images/Logo/somnia_logo.png",
  },
  {
    logo: "/Images/Logo/wagmi-logo.svg",
  },
  {
    name: "Somnia Network",
    logo: "/Images/Logo/somnia_logo.png",
  },
  {
    logo: "/Images/Logo/wagmi-logo.svg",
  },
  {
    name: "Somnia Network",
    logo: "/Images/Logo/somnia_logo.png",
  },
  {
    logo: "/Images/Logo/wagmi-logo.svg",
  },
];

export function LogoMarquee() {
  return (
    <div className="w-full relative">
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
      {/* Your content goes here */}
      <section className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
            Built with{" "}
            <span className="text-purple-600">Leading Technologies</span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Powered by the most trusted protocols in Web3
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-logo-marquee space-x-8">
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center justify-center flex-shrink-0 min-w-[180px]"
              >
                <div className="flex items-center space-x-3 px-4 py-3 transition-all duration-200">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-8 w-auto object-contain"
                  />
                  <span className="text-gray-800 font-medium text-sm whitespace-nowrap">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center justify-center flex-shrink-0 min-w-[180px]"
              >
                <div className="flex items-center space-x-3 px-4 py-3  backdrop-blur-sm rounded-lg transition-all duration-200">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-8 w-auto object-contain"
                  />
                  <span className="text-gray-800 font-medium text-sm whitespace-nowrap">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient overlays */}
          {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-purple-100 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-purple-100 to-transparent"></div> */}
        </div>
      </section>
    </div>
  );
}
