"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useGetProductsQuery } from "@services/products-api";
import { getImageUrl } from "@shared/utils";
import { paths } from "@root/paths";
import { SlideUp, StaggerContainer, StaggerItem, springSnappy } from "@components/animations";

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse">
      <div className="h-36 bg-gray-200 rounded-xl mb-3" />
      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-1" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const imgUrl = getImageUrl(product.image);
  return (
    <motion.div whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={springSnappy}>
      <Link
        href={paths.product(product.id)}
        className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group relative flex flex-col"
      >
        <div className="flex justify-center mb-3 h-36 items-center bg-gray-50 rounded-xl overflow-hidden">
          {imgUrl ? (
            <img src={imgUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <svg viewBox="0 0 120 180" className="w-20 h-28" fill="none">
              <rect x="15" y="5" width="90" height="170" rx="16" fill="#1a1a2e" />
              <rect x="20" y="12" width="80" height="156" rx="12" fill="#111" />
              <rect x="24" y="18" width="72" height="140" rx="9" fill="#0f3460" fillOpacity="0.8" />
              <rect x="45" y="12" width="30" height="8" rx="4" fill="#1a1a2e" />
              <circle cx="60" cy="16" r="2.5" fill="#333" />
              <rect x="40" y="165" width="40" height="3" rx="1.5" fill="white" fillOpacity="0.4" />
            </svg>
          )}
        </div>
        {product.stock === 0 && (
          <span className="absolute top-3 right-3 bg-red-100 text-red-600 text-[9px] font-bold px-1.5 py-0.5 rounded">Out of Stock</span>
        )}
        <h3 className="text-xs font-semibold text-gray-800 mb-1 leading-snug line-clamp-2">{product.name}</h3>
        <p className="text-sm font-bold text-gray-900 mt-auto">${product.price.toLocaleString("en-US")}</p>
        {product.stock > 0 && <p className="text-xs text-green-600 font-medium mt-0.5">In Stock ({product.stock})</p>}
      </Link>
    </motion.div>
  );
}

export default function SmartphonesSection() {
  const { data, isLoading } = useGetProductsQuery({ category: "Smartphones", limit: 5 });
  const products = data?.data ?? [];

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <SlideUp className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Grab the best deal on <span className="text-blue-500">Smartphones</span>
          </h2>
          <motion.div whileHover={{ x: 4 }} transition={springSnappy}>
            <Link href={`${paths.products}?category=Smartphones`} className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
              View All <ChevronRight size={16} />
            </Link>
          </motion.div>
        </SlideUp>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" stagger={0.07}>
            {products.map((p) => (
              <StaggerItem key={p.id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
