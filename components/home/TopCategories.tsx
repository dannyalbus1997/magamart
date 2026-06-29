import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const categories = [
  {
    name: "Mobile",
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <rect x="15" y="5" width="30" height="50" rx="6" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1.5" />
        <rect x="19" y="10" width="22" height="38" rx="4" fill="#1f2937" />
        <rect x="23" y="12" width="14" height="32" rx="3" fill="#374151" />
        <rect x="25" y="48" width="10" height="2" rx="1" fill="#6b7280" />
        <circle cx="30" cy="7.5" r="1.5" fill="#9ca3af" />
      </svg>
    ),
  },
  {
    name: "Cosmetics",
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <ellipse cx="30" cy="38" rx="10" ry="16" fill="#fca5a5" stroke="#f87171" strokeWidth="1.5" />
        <rect x="26" y="8" width="8" height="20" rx="3" fill="#c4b5fd" stroke="#a78bfa" strokeWidth="1.5" />
        <ellipse cx="30" cy="28" rx="8" ry="4" fill="#a78bfa" />
        <ellipse cx="30" cy="37" rx="6" ry="5" fill="#fde68a" fillOpacity="0.5" />
        <path d="M24 22 Q30 18 36 22" stroke="#a78bfa" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    name: "Electronics",
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <rect x="8" y="14" width="44" height="28" rx="4" fill="#1e293b" />
        <rect x="12" y="18" width="36" height="20" rx="2" fill="#0ea5e9" fillOpacity="0.8" />
        <rect x="22" y="42" width="16" height="4" rx="1" fill="#334155" />
        <rect x="18" y="46" width="24" height="3" rx="1" fill="#475569" />
        {/* Screen content */}
        <rect x="15" y="21" width="10" height="6" rx="1" fill="white" fillOpacity="0.2" />
        <rect x="28" y="21" width="16" height="6" rx="1" fill="white" fillOpacity="0.2" />
        <rect x="15" y="30" width="29" height="4" rx="1" fill="white" fillOpacity="0.1" />
      </svg>
    ),
  },
  {
    name: "Furniture",
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <rect x="10" y="28" width="40" height="14" rx="4" fill="#92400e" />
        <rect x="10" y="22" width="40" height="8" rx="3" fill="#b45309" />
        <rect x="14" y="42" width="6" height="12" rx="2" fill="#78350f" />
        <rect x="40" y="42" width="6" height="12" rx="2" fill="#78350f" />
        <rect x="8" y="20" width="10" height="22" rx="3" fill="#d97706" />
        <rect x="42" y="20" width="10" height="22" rx="3" fill="#d97706" />
      </svg>
    ),
  },
  {
    name: "Watches",
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <circle cx="30" cy="32" r="14" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />
        <circle cx="30" cy="32" r="11" fill="white" stroke="#d1d5db" strokeWidth="1" />
        <line x1="30" y1="32" x2="30" y2="24" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="30" y1="32" x2="36" y2="34" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="30" cy="32" r="1.5" fill="#374151" />
        <rect x="23" y="8" width="14" height="10" rx="4" fill="#6b7280" />
        <rect x="23" y="42" width="14" height="10" rx="4" fill="#6b7280" />
      </svg>
    ),
  },
  {
    name: "Decor",
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <path d="M30 8 C20 8 14 18 14 28 C14 40 22 50 30 50 C38 50 46 40 46 28 C46 18 40 8 30 8Z" fill="#86efac" />
        <path d="M30 15 C25 15 21 22 21 28" stroke="#16a34a" strokeWidth="1.5" fill="none" />
        <ellipse cx="30" cy="48" rx="8" ry="4" fill="#92400e" />
        <rect x="26" y="44" width="8" height="6" rx="2" fill="#a16207" />
      </svg>
    ),
  },
  {
    name: "Accessories",
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <path d="M15 30 A15 15 0 0 1 45 30" stroke="#f59e0b" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="15" cy="30" r="5" fill="#fbbf24" />
        <circle cx="45" cy="30" r="5" fill="#fbbf24" />
        <path d="M22 30 A8 8 0 0 1 38 30" stroke="#d97706" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="30" cy="44" r="4" fill="#f59e0b" />
        <path d="M26 44 Q30 38 34 44" fill="#fbbf24" />
      </svg>
    ),
  },
];

export default function TopCategories() {
  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Shop From <span className="text-blue-500">Top Categories</span>
          </h2>
          <Link
            href="#"
            className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href="#"
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full border-2 border-gray-100 bg-gray-50 flex items-center justify-center group-hover:border-blue-300 group-hover:bg-blue-50 transition-all">
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center group-hover:text-blue-600 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
