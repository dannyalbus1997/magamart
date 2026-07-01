"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useGetCategoryNamesQuery } from "@services/products-api";
import { paths } from "@root/paths";
import { SlideUp, StaggerContainer, StaggerItem, springBouncy, springSnappy } from "@components/animations";

const CATEGORY_META: Record<string, { bg: string; icon: React.ReactNode }> = {
  Electronics: {
    bg: "bg-blue-50 border-blue-100 hover:border-blue-300 hover:bg-blue-100",
    icon: (<svg viewBox="0 0 60 60" className="w-10 h-10" fill="none"><rect x="8" y="14" width="44" height="28" rx="4" fill="#1e293b" /><rect x="12" y="18" width="36" height="20" rx="2" fill="#0ea5e9" fillOpacity="0.8" /><rect x="22" y="42" width="16" height="4" rx="1" fill="#334155" /><rect x="18" y="46" width="24" height="3" rx="1" fill="#475569" /><rect x="15" y="21" width="10" height="6" rx="1" fill="white" fillOpacity="0.2" /><rect x="28" y="21" width="16" height="6" rx="1" fill="white" fillOpacity="0.2" /></svg>),
  },
  Smartphones: {
    bg: "bg-indigo-50 border-indigo-100 hover:border-indigo-300 hover:bg-indigo-100",
    icon: (<svg viewBox="0 0 60 60" className="w-10 h-10" fill="none"><rect x="15" y="5" width="30" height="50" rx="6" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1.5" /><rect x="19" y="10" width="22" height="38" rx="4" fill="#1f2937" /><rect x="23" y="12" width="14" height="32" rx="3" fill="#374151" /><rect x="25" y="48" width="10" height="2" rx="1" fill="#6b7280" /><circle cx="30" cy="7.5" r="1.5" fill="#9ca3af" /></svg>),
  },
  Fashion: {
    bg: "bg-pink-50 border-pink-100 hover:border-pink-300 hover:bg-pink-100",
    icon: (<svg viewBox="0 0 60 60" className="w-10 h-10" fill="none"><path d="M20 15 L10 28 L20 28 L18 50 L42 50 L40 28 L50 28 L40 15 Q35 20 30 18 Q25 20 20 15Z" fill="#f9a8d4" stroke="#ec4899" strokeWidth="1.5" /><path d="M24 15 Q30 22 36 15" stroke="#ec4899" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>),
  },
  Furniture: {
    bg: "bg-amber-50 border-amber-100 hover:border-amber-300 hover:bg-amber-100",
    icon: (<svg viewBox="0 0 60 60" className="w-10 h-10" fill="none"><rect x="10" y="28" width="40" height="14" rx="4" fill="#92400e" /><rect x="10" y="22" width="40" height="8" rx="3" fill="#b45309" /><rect x="14" y="42" width="6" height="12" rx="2" fill="#78350f" /><rect x="40" y="42" width="6" height="12" rx="2" fill="#78350f" /><rect x="8" y="20" width="10" height="22" rx="3" fill="#d97706" /><rect x="42" y="20" width="10" height="22" rx="3" fill="#d97706" /></svg>),
  },
  Cosmetics: {
    bg: "bg-rose-50 border-rose-100 hover:border-rose-300 hover:bg-rose-100",
    icon: (<svg viewBox="0 0 60 60" className="w-10 h-10" fill="none"><ellipse cx="30" cy="38" rx="10" ry="16" fill="#fca5a5" stroke="#f87171" strokeWidth="1.5" /><rect x="26" y="8" width="8" height="20" rx="3" fill="#c4b5fd" stroke="#a78bfa" strokeWidth="1.5" /><ellipse cx="30" cy="28" rx="8" ry="4" fill="#a78bfa" /><ellipse cx="30" cy="37" rx="6" ry="5" fill="#fde68a" fillOpacity="0.5" /></svg>),
  },
  Watches: {
    bg: "bg-gray-50 border-gray-100 hover:border-gray-300 hover:bg-gray-100",
    icon: (<svg viewBox="0 0 60 60" className="w-10 h-10" fill="none"><circle cx="30" cy="32" r="14" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" /><circle cx="30" cy="32" r="11" fill="white" stroke="#d1d5db" strokeWidth="1" /><line x1="30" y1="32" x2="30" y2="24" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" /><line x1="30" y1="32" x2="36" y2="34" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" /><circle cx="30" cy="32" r="1.5" fill="#374151" /><rect x="23" y="8" width="14" height="10" rx="4" fill="#6b7280" /><rect x="23" y="42" width="14" height="10" rx="4" fill="#6b7280" /></svg>),
  },
  Accessories: {
    bg: "bg-yellow-50 border-yellow-100 hover:border-yellow-300 hover:bg-yellow-100",
    icon: (<svg viewBox="0 0 60 60" className="w-10 h-10" fill="none"><path d="M15 30 A15 15 0 0 1 45 30" stroke="#f59e0b" strokeWidth="5" fill="none" strokeLinecap="round" /><circle cx="15" cy="30" r="5" fill="#fbbf24" /><circle cx="45" cy="30" r="5" fill="#fbbf24" /><path d="M22 30 A8 8 0 0 1 38 30" stroke="#d97706" strokeWidth="3" fill="none" strokeLinecap="round" /><circle cx="30" cy="44" r="4" fill="#f59e0b" /></svg>),
  },
  "Daily Essentials": {
    bg: "bg-green-50 border-green-100 hover:border-green-300 hover:bg-green-100",
    icon: (<svg viewBox="0 0 60 60" className="w-10 h-10" fill="none"><path d="M12 33 Q12 48 30 49 Q48 48 48 33 Z" fill="#92400e" /><path d="M12 33 Q12 30 30 30 Q48 30 48 33" fill="#b45309" /><circle cx="23" cy="24" r="8" fill="#ef4444" /><circle cx="35" cy="22" r="7" fill="#f97316" /></svg>),
  },
  "Home & Kitchen": {
    bg: "bg-orange-50 border-orange-100 hover:border-orange-300 hover:bg-orange-100",
    icon: (<svg viewBox="0 0 60 60" className="w-10 h-10" fill="none"><ellipse cx="30" cy="42" rx="18" ry="6" fill="#fed7aa" stroke="#f97316" strokeWidth="1.5" /><path d="M12 42 Q12 28 30 26 Q48 28 48 42" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" /><line x1="30" y1="10" x2="30" y2="26" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" /><line x1="22" y1="14" x2="22" y2="26" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" /><line x1="38" y1="14" x2="38" y2="26" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" /></svg>),
  },
  Sports: {
    bg: "bg-emerald-50 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-100",
    icon: (<svg viewBox="0 0 60 60" className="w-10 h-10" fill="none"><circle cx="30" cy="32" r="18" fill="white" stroke="#10b981" strokeWidth="2" /><path d="M12 32 Q18 22 30 20 Q42 22 48 32" stroke="#10b981" strokeWidth="1.5" fill="none" /><path d="M12 32 Q18 42 30 44 Q42 42 48 32" stroke="#10b981" strokeWidth="1.5" fill="none" /><line x1="30" y1="14" x2="30" y2="50" stroke="#10b981" strokeWidth="1.5" /></svg>),
  },
  Beauty: {
    bg: "bg-purple-50 border-purple-100 hover:border-purple-300 hover:bg-purple-100",
    icon: (<svg viewBox="0 0 60 60" className="w-10 h-10" fill="none"><path d="M30 8 L34 20 L46 20 L36 28 L40 40 L30 32 L20 40 L24 28 L14 20 L26 20 Z" fill="#c4b5fd" stroke="#a78bfa" strokeWidth="1" /></svg>),
  },
  Groceries: {
    bg: "bg-lime-50 border-lime-100 hover:border-lime-300 hover:bg-lime-100",
    icon: (<svg viewBox="0 0 60 60" className="w-10 h-10" fill="none"><path d="M10 20 L14 46 Q14 50 18 50 L42 50 Q46 50 46 46 L50 20 Z" fill="#ecfccb" stroke="#84cc16" strokeWidth="1.5" /><path d="M20 20 Q20 12 30 12 Q40 12 40 20" stroke="#84cc16" strokeWidth="2" fill="none" strokeLinecap="round" /><circle cx="24" cy="34" r="4" fill="#84cc16" /><circle cx="36" cy="34" r="4" fill="#4ade80" /><circle cx="30" cy="40" r="4" fill="#f97316" /></svg>),
  },
};

function DefaultIcon({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
      <span className="text-blue-600 text-sm font-bold">{initials}</span>
    </div>
  );
}

export default function TopCategories() {
  const { data, isLoading } = useGetCategoryNamesQuery();
  const categories = data?.data ?? [];

  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SlideUp className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Shop From <span className="text-blue-500">Top Categories</span>
          </h2>
          <motion.div whileHover={{ x: 4 }} transition={springSnappy}>
            <Link href={paths.products} className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
              View All <ChevronRight size={16} />
            </Link>
          </motion.div>
        </SlideUp>

        {isLoading ? (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-gray-200" />
                <div className="h-3 w-14 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-4" stagger={0.055}>
            {categories.map((cat) => {
              const meta = CATEGORY_META[cat];
              const circleClass = "w-16 h-16 rounded-full border-2 flex items-center justify-center " +
                (meta ? "bg-gray-50 border-gray-100 " + meta.bg : "bg-gray-50 border-gray-100 hover:border-blue-300 hover:bg-blue-50");
              return (
                <StaggerItem key={cat}>
                  <Link href={`${paths.products}?category=${encodeURIComponent(cat)}`} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <motion.div
                      whileHover={{ scale: 1.15, y: -4 }}
                      whileTap={{ scale: 0.92 }}
                      transition={springBouncy}
                      className={circleClass}
                    >
                      {meta ? meta.icon : <DefaultIcon name={cat} />}
                    </motion.div>
                    <span className="text-xs font-medium text-gray-700 text-center group-hover:text-blue-600 transition-colors leading-tight">{cat}</span>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
