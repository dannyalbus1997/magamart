import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const essentials = [
  {
    name: "Daily Essentials",
    offer: "UP to 50% OFF",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
        {/* Basket */}
        <path d="M20 55 Q20 80 50 82 Q80 80 80 55 Z" fill="#92400e" />
        <path d="M20 55 Q20 50 50 50 Q80 50 80 55" fill="#b45309" />
        {[0,1,2].map(i => (
          <path key={i} d={`M${27+i*20} 50 Q${30+i*20} 68 ${33+i*20} 78`} stroke="#78350f" strokeWidth="1.5" fill="none" />
        ))}
        {[0,1].map(i => (
          <path key={i} d={`M20 ${57+i*12} Q50 ${55+i*12} 80 ${57+i*12}`} stroke="#78350f" strokeWidth="1" fill="none" />
        ))}
        {/* Apple */}
        <circle cx="38" cy="40" r="14" fill="#ef4444" />
        <path d="M38 26 Q43 20 50 23" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Orange */}
        <circle cx="58" cy="37" r="11" fill="#f97316" />
        <path d="M58 26 Q62 20 68 23" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="35" cy="36" r="4" fill="white" fillOpacity="0.25" />
      </svg>
    ),
  },
  {
    name: "Vegetables",
    offer: "UP to 60% OFF",
    bg: "bg-green-50",
    border: "border-green-200",
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
        {/* Carrot */}
        <path d="M50 70 Q42 50 40 30" stroke="#f97316" strokeWidth="12" strokeLinecap="round" />
        <path d="M40 30 Q36 18 42 15" stroke="#16a34a" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M40 30 Q30 22 28 28" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M40 30 Q44 18 50 18" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Lettuce */}
        <ellipse cx="65" cy="60" rx="18" ry="15" fill="#86efac" />
        <ellipse cx="65" cy="58" rx="14" ry="11" fill="#4ade80" />
        <path d="M55 55 Q65 50 75 55" stroke="#16a34a" strokeWidth="1.5" fill="none" />
        <path d="M52 62 Q65 58 78 62" stroke="#16a34a" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    name: "Fruits",
    offer: "UP to 50% OFF",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
        {/* Watermelon slice */}
        <path d="M20 70 A40 40 0 0 1 80 70 Z" fill="#4ade80" />
        <path d="M22 65 A35 35 0 0 1 78 65 Z" fill="#f87171" />
        <path d="M25 60 A30 30 0 0 1 75 60 Z" fill="#ef4444" />
        <circle cx="38" cy="63" r="2" fill="#1f2937" />
        <circle cx="50" cy="60" r="2" fill="#1f2937" />
        <circle cx="62" cy="63" r="2" fill="#1f2937" />
        <circle cx="44" cy="56" r="2" fill="#1f2937" />
        <circle cx="56" cy="56" r="2" fill="#1f2937" />
        {/* Apple top right */}
        <circle cx="72" cy="35" r="12" fill="#f87171" />
        <path d="M72 23 Q77 17 82 20" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Lemon top left */}
        <ellipse cx="28" cy="35" rx="12" ry="10" fill="#fde047" />
        <path d="M16 35 Q28 28 40 35" stroke="#ca8a04" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
  {
    name: "Strawberry",
    offer: "UP to 50% OFF",
    bg: "bg-pink-50",
    border: "border-pink-200",
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
        {/* Big strawberry */}
        <path d="M50 80 Q30 65 28 45 Q28 25 50 25 Q72 25 72 45 Q70 65 50 80Z" fill="#f43f5e" />
        <path d="M28 45 Q28 30 35 27 Q42 22 50 25 Q58 22 65 27 Q72 30 72 45" fill="#4ade80" />
        <path d="M42 20 Q50 12 58 20" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Seeds */}
        {[[40,50],[50,45],[60,50],[45,60],[55,60],[50,70]].map(([x,y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="2" ry="3" fill="#9f1239" transform={`rotate(15, ${x}, ${y})`} />
        ))}
        {/* Highlight */}
        <ellipse cx="40" cy="42" rx="6" ry="8" fill="white" fillOpacity="0.2" transform="rotate(-15, 40, 42)" />
        {/* Small strawberry */}
        <path d="M75 55 Q66 48 65 38 Q65 28 75 28 Q85 28 85 38 Q84 48 75 55Z" fill="#fb7185" />
        <ellipse cx="75" cy="32" rx="5" ry="4" fill="#4ade80" />
      </svg>
    ),
  },
  {
    name: "Mango",
    offer: "UP to 50% OFF",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
        <path d="M50 85 Q25 70 22 45 Q20 20 50 15 Q80 20 78 45 Q75 70 50 85Z" fill="#fbbf24" />
        <path d="M50 15 Q60 8 68 12 Q60 18 50 15Z" fill="#16a34a" />
        <path d="M50 15 Q52 5 58 8" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M35 35 Q50 25 65 35" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
        <path d="M30 50 Q50 38 70 50" stroke="#f59e0b" strokeWidth="1" fill="none" />
        <ellipse cx="40" cy="40" rx="8" ry="12" fill="white" fillOpacity="0.2" transform="rotate(-15, 40, 40)" />
        <path d="M50 85 Q48 92 50 95 Q52 92 50 85Z" fill="#16a34a" />
      </svg>
    ),
  },
  {
    name: "Cherry",
    offer: "UP to 50% OFF",
    bg: "bg-rose-50",
    border: "border-rose-200",
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
        {/* Stems */}
        <path d="M38 62 Q38 40 55 32 Q70 40 68 62" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M55 32 Q65 18 72 22" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Left cherry */}
        <circle cx="35" cy="70" r="16" fill="#be123c" />
        <circle cx="30" cy="63" r="5" fill="white" fillOpacity="0.25" />
        {/* Right cherry */}
        <circle cx="68" cy="70" r="16" fill="#e11d48" />
        <circle cx="63" cy="63" r="5" fill="white" fillOpacity="0.25" />
      </svg>
    ),
  },
];

export default function DailyEssentials() {
  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            <span className="text-blue-500">Daily Essentials</span>
          </h2>
          <Link
            href="#"
            className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {essentials.map((item) => (
            <Link
              key={item.name}
              href="#"
              className={`flex flex-col items-center gap-2 ${item.bg} border ${item.border} rounded-2xl p-4 hover:shadow-md transition-shadow group`}
            >
              {item.icon}
              <p className="text-xs font-semibold text-gray-800 text-center">{item.name}</p>
              <p className="text-[10px] font-medium text-blue-600 text-center">{item.offer}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
