"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    tag: "Best Deal Online on smart watches",
    title: "SMART WEARABLE.",
    subtitle: "UP to 80% OFF",
    bgColor: "bg-[#1a1f3c]",
    accentColor: "text-blue-400",
    image: (
      <svg viewBox="0 0 200 220" className="w-40 h-44 drop-shadow-2xl" fill="none">
        {/* Watch body */}
        <rect x="60" y="55" width="80" height="110" rx="20" fill="#2a2f5c" stroke="#4a90e2" strokeWidth="2" />
        <rect x="68" y="63" width="64" height="94" rx="14" fill="#0d1117" />
        {/* Screen */}
        <rect x="72" y="67" width="56" height="86" rx="10" fill="#111827" />
        {/* Time display */}
        <text x="100" y="98" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold" fontFamily="monospace">08:26</text>
        <text x="100" y="112" textAnchor="middle" fill="#9ca3af" fontSize="6">MON 15 JUN</text>
        {/* Steps indicator */}
        <rect x="78" y="120" width="44" height="4" rx="2" fill="#1f2937" />
        <rect x="78" y="120" width="28" height="4" rx="2" fill="#3b82f6" />
        <text x="100" y="138" textAnchor="middle" fill="#6b7280" fontSize="5">5,432 steps</text>
        {/* Crown/button */}
        <rect x="138" y="88" width="6" height="22" rx="3" fill="#374151" />
        <rect x="56" y="88" width="6" height="22" rx="3" fill="#374151" />
        {/* Band top */}
        <rect x="72" y="20" width="16" height="38" rx="6" fill="#2563eb" />
        <rect x="112" y="20" width="16" height="38" rx="6" fill="#2563eb" />
        {/* Band bottom */}
        <rect x="72" y="162" width="16" height="38" rx="6" fill="#2563eb" />
        <rect x="112" y="162" width="16" height="38" rx="6" fill="#2563eb" />
        {/* Band holes */}
        <circle cx="80" cy="190" r="2" fill="#1d4ed8" />
        <circle cx="80" cy="197" r="2" fill="#1d4ed8" />
        <circle cx="80" cy="184" r="2" fill="#1d4ed8" />
        {/* Glow effect */}
        <ellipse cx="100" cy="110" rx="42" ry="52" fill="#3b82f6" fillOpacity="0.05" />
      </svg>
    ),
  },
  {
    id: 2,
    tag: "Exclusive Deals on Smartphones",
    title: "TOP MOBILES.",
    subtitle: "UP to 86% OFF",
    bgColor: "bg-[#0f2027]",
    accentColor: "text-cyan-400",
    image: (
      <svg viewBox="0 0 160 220" className="w-36 h-44 drop-shadow-2xl" fill="none">
        <rect x="30" y="15" width="100" height="190" rx="18" fill="#1f2937" stroke="#374151" strokeWidth="2" />
        <rect x="36" y="28" width="88" height="162" rx="12" fill="#111827" />
        <rect x="40" y="32" width="80" height="154" rx="10" fill="#0f172a" />
        {/* Screen content */}
        <rect x="44" y="60" width="72" height="90" rx="4" fill="#1e40af" fillOpacity="0.3" />
        <circle cx="80" cy="105" r="20" fill="#3b82f6" fillOpacity="0.5" />
        <text x="80" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">M13</text>
        {/* Camera */}
        <circle cx="80" cy="22" r="4" fill="#374151" />
        <circle cx="80" cy="22" r="2.5" fill="#111827" />
        {/* Home indicator */}
        <rect x="60" y="195" width="40" height="3" rx="1.5" fill="#4b5563" />
      </svg>
    ),
  },
  {
    id: 3,
    tag: "Fresh & Organic Daily",
    title: "DAILY ESSENTIALS.",
    subtitle: "UP to 50% OFF",
    bgColor: "bg-[#0d2818]",
    accentColor: "text-green-400",
    image: (
      <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-2xl" fill="none">
        <ellipse cx="100" cy="160" rx="70" ry="15" fill="#166534" fillOpacity="0.3" />
        {/* Basket */}
        <path d="M40 100 Q40 160 100 165 Q160 160 160 100 Z" fill="#92400e" />
        <path d="M40 100 Q40 95 100 95 Q160 95 160 100" fill="#a16207" />
        {/* Basket weave */}
        {[0,1,2,3].map(i => (
          <path key={i} d={`M${50+i*25} 100 Q${55+i*25} 140 ${60+i*25} 160`} stroke="#78350f" strokeWidth="1.5" fill="none" />
        ))}
        {[0,1,2].map(i => (
          <path key={i} d={`M40 ${105+i*18} Q100 ${100+i*18} 160 ${105+i*18}`} stroke="#78350f" strokeWidth="1" fill="none" />
        ))}
        {/* Fruits */}
        <circle cx="75" cy="85" r="22" fill="#ef4444" />
        <path d="M75 63 Q80 55 88 58" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="115" cy="80" r="18" fill="#f97316" />
        <path d="M115 62 Q119 54 126 57" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="95" cy="72" r="14" fill="#eab308" />
        {/* Highlights */}
        <circle cx="70" cy="78" r="5" fill="white" fillOpacity="0.3" />
        <circle cx="110" cy="74" r="4" fill="white" fillOpacity="0.3" />
      </svg>
    ),
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const slide = slides[current];

  return (
    <div className={`relative overflow-hidden ${slide.bgColor} transition-colors duration-700`}>
      <div className="max-w-7xl mx-auto px-6 py-10 flex items-center justify-between min-h-[260px]">
        {/* Prev Button */}
        <button
          onClick={prev}
          className="absolute left-3 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 transition-colors flex items-center justify-center text-white"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Content */}
        <div className="flex-1 pl-8">
          <p className={`text-sm font-medium mb-2 ${slide.accentColor} uppercase tracking-wider`}>
            {slide.tag}
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-3">
            {slide.title}
          </h1>
          <p className="text-lg font-semibold text-white/80 mb-6">{slide.subtitle}</p>
          <button className="bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold px-7 py-2.5 rounded-full text-sm">
            Shop Now
          </button>
        </div>

        {/* Image */}
        <div className="flex-shrink-0 pr-16 flex items-center justify-center">
          {slide.image}
        </div>

        {/* Next Button */}
        <button
          onClick={next}
          className="absolute right-3 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 transition-colors flex items-center justify-center text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
