"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    tag: "Best Deal Online on smart watches",
    title: "SMART WEARABLE.",
    subtitle: "UP to 80% OFF",
    bgFrom: "#0f172a",
    bgTo: "#1e1b4b",
    accentColor: "text-blue-400",
    badgeColor: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    blob1: "rgba(99,102,241,0.25)",
    blob2: "rgba(59,130,246,0.15)",
    image: (
      <svg viewBox="0 0 200 220" className="w-40 h-44 drop-shadow-2xl" fill="none">
        <rect x="60" y="55" width="80" height="110" rx="20" fill="#2a2f5c" stroke="#4a90e2" strokeWidth="2" />
        <rect x="68" y="63" width="64" height="94" rx="14" fill="#0d1117" />
        <rect x="72" y="67" width="56" height="86" rx="10" fill="#111827" />
        <text x="100" y="98" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold" fontFamily="monospace">08:26</text>
        <text x="100" y="112" textAnchor="middle" fill="#9ca3af" fontSize="6">MON 15 JUN</text>
        <rect x="78" y="120" width="44" height="4" rx="2" fill="#1f2937" />
        <rect x="78" y="120" width="28" height="4" rx="2" fill="#3b82f6" />
        <text x="100" y="138" textAnchor="middle" fill="#6b7280" fontSize="5">5,432 steps</text>
        <rect x="138" y="88" width="6" height="22" rx="3" fill="#374151" />
        <rect x="56" y="88" width="6" height="22" rx="3" fill="#374151" />
        <rect x="72" y="20" width="16" height="38" rx="6" fill="#2563eb" />
        <rect x="112" y="20" width="16" height="38" rx="6" fill="#2563eb" />
        <rect x="72" y="162" width="16" height="38" rx="6" fill="#2563eb" />
        <rect x="112" y="162" width="16" height="38" rx="6" fill="#2563eb" />
        <circle cx="80" cy="190" r="2" fill="#1d4ed8" />
        <circle cx="80" cy="197" r="2" fill="#1d4ed8" />
        <circle cx="80" cy="184" r="2" fill="#1d4ed8" />
        <ellipse cx="100" cy="110" rx="42" ry="52" fill="#3b82f6" fillOpacity="0.05" />
      </svg>
    ),
  },
  {
    id: 2,
    tag: "Exclusive Deals on Smartphones",
    title: "TOP MOBILES.",
    subtitle: "UP to 86% OFF",
    bgFrom: "#0c1a2e",
    bgTo: "#0f2027",
    accentColor: "text-cyan-400",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
    blob1: "rgba(6,182,212,0.2)",
    blob2: "rgba(59,130,246,0.12)",
    image: (
      <svg viewBox="0 0 160 220" className="w-36 h-44 drop-shadow-2xl" fill="none">
        <rect x="30" y="15" width="100" height="190" rx="18" fill="#1f2937" stroke="#374151" strokeWidth="2" />
        <rect x="36" y="28" width="88" height="162" rx="12" fill="#111827" />
        <rect x="40" y="32" width="80" height="154" rx="10" fill="#0f172a" />
        <rect x="44" y="60" width="72" height="90" rx="4" fill="#1e40af" fillOpacity="0.3" />
        <circle cx="80" cy="105" r="20" fill="#3b82f6" fillOpacity="0.5" />
        <text x="80" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">M13</text>
        <circle cx="80" cy="22" r="4" fill="#374151" />
        <circle cx="80" cy="22" r="2.5" fill="#111827" />
        <rect x="60" y="195" width="40" height="3" rx="1.5" fill="#4b5563" />
      </svg>
    ),
  },
  {
    id: 3,
    tag: "Fresh & Organic Daily",
    title: "DAILY ESSENTIALS.",
    subtitle: "UP to 50% OFF",
    bgFrom: "#052e16",
    bgTo: "#0d2818",
    accentColor: "text-green-400",
    badgeColor: "bg-green-500/20 text-green-300 border border-green-500/30",
    blob1: "rgba(34,197,94,0.2)",
    blob2: "rgba(21,128,61,0.15)",
    image: (
      <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-2xl" fill="none">
        <ellipse cx="100" cy="160" rx="70" ry="15" fill="#166534" fillOpacity="0.3" />
        <path d="M40 100 Q40 160 100 165 Q160 160 160 100 Z" fill="#92400e" />
        <path d="M40 100 Q40 95 100 95 Q160 95 160 100" fill="#a16207" />
        {[0,1,2,3].map(i => (
          <path key={i} d={`M${50+i*25} 100 Q${55+i*25} 140 ${60+i*25} 160`} stroke="#78350f" strokeWidth="1.5" fill="none" />
        ))}
        {[0,1,2].map(i => (
          <path key={i} d={`M40 ${105+i*18} Q100 ${100+i*18} 160 ${105+i*18}`} stroke="#78350f" strokeWidth="1" fill="none" />
        ))}
        <circle cx="75" cy="85" r="22" fill="#ef4444" />
        <path d="M75 63 Q80 55 88 58" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="115" cy="80" r="18" fill="#f97316" />
        <path d="M115 62 Q119 54 126 57" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="95" cy="72" r="14" fill="#eab308" />
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
    <div
      className="relative overflow-hidden transition-all duration-700"
      style={{ background: `linear-gradient(135deg, ${slide.bgFrom} 0%, ${slide.bgTo} 100%)` }}
    >
      {/* Decorative gradient blobs */}
      <div
        className="absolute -top-16 -right-16 w-72 h-72 rounded-full blur-3xl opacity-60 pointer-events-none transition-all duration-700"
        style={{ background: slide.blob1 }}
      />
      <div
        className="absolute -bottom-16 -left-8 w-56 h-56 rounded-full blur-3xl opacity-40 pointer-events-none transition-all duration-700"
        style={{ background: slide.blob2 }}
      />

      <div className="max-w-7xl mx-auto px-6 py-10 flex items-center justify-between min-h-[280px] relative">
        {/* Prev Button */}
        <button
          onClick={prev}
          className="absolute left-3 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm transition-all flex items-center justify-center text-white shadow-lg"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Content */}
        <div className="flex-1 pl-8 pr-4">
          {/* Tag badge */}
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider ${slide.badgeColor}`}>
            {slide.tag}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-3 drop-shadow-lg">
            {slide.title}
          </h1>
          <p className={`text-xl font-bold mb-6 ${slide.accentColor}`}>{slide.subtitle}</p>
          <div className="flex items-center gap-3">
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all text-white font-bold px-8 py-3 rounded-full text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transform">
              Shop Now
            </button>
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-full text-sm transition-all">
              View Deals
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-shrink-0 pr-16 flex items-center justify-center relative">
          {/* Glow ring behind product */}
          <div
            className="absolute w-44 h-44 rounded-full blur-2xl opacity-30"
            style={{ background: slide.blob1 }}
          />
          <div className="relative">
            {slide.image}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={next}
          className="absolute right-3 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm transition-all flex items-center justify-center text-white shadow-lg"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Gradient dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-6 h-2.5 bg-gradient-to-r from-blue-400 to-indigo-400 shadow-md shadow-blue-400/50"
                : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
