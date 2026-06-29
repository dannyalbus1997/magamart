"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useGetProductsQuery } from "@services/products-api";
import { getImageUrl } from "@shared/utils";
import { paths } from "@root/paths";

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse">
      <div className="h-32 bg-gray-200 rounded-xl mb-3" />
      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

export default function DailyEssentials() {
  const { data, isLoading } = useGetProductsQuery({ category: "Daily Essentials", limit: 6 });
  const products = data?.data ?? [];

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Shop <span className="text-blue-500">Daily Essentials</span>
          </h2>
          <Link
            href={`${paths.products}?category=Daily+Essentials`}
            className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
            : products.map((p) => {
                const imgUrl = getImageUrl(p.image);
                return (
                  <Link
                    key={p.id}
                    href={paths.product(p.id)}
                    className="flex flex-col bg-amber-50 border border-amber-100 rounded-2xl p-4 hover:shadow-md transition-shadow group items-center text-center"
                  >
                    <div className="w-full h-28 rounded-xl overflow-hidden bg-white mb-3 flex items-center justify-center">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <svg viewBox="0 0 100 100" className="w-14 h-14" fill="none">
                          <path d="M20 55 Q20 80 50 82 Q80 80 80 55 Z" fill="#92400e" />
                          <path d="M20 55 Q20 50 50 50 Q80 50 80 55" fill="#b45309" />
                          <circle cx="38" cy="40" r="14" fill="#ef4444" />
                          <circle cx="58" cy="37" r="11" fill="#f97316" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-gray-800 line-clamp-2 mb-1">{p.name}</p>
                    <p className="text-sm font-bold text-blue-600">${p.price.toLocaleString("en-US")}</p>
                  </Link>
                );
              })}
        </div>
      </div>
    </section>
  );
}
