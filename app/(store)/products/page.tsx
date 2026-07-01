"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetProductsQuery, useGetCategoryNamesQuery } from "@services/products-api";
import { useAddToCartMutation } from "@services/cart-api";
import { useSelector } from "@store/index";
import { selectAuthUser } from "@slices/auth";
import toast from "react-hot-toast";
import type { Product } from "@root/types";
import { paths } from "@root/paths";
import { getImageUrl } from "@shared/utils";
import { springBouncy, springSnappy } from "@components/animations";

const SORT_OPTIONS = [
  { label: "Newest", sortBy: "createdAt", sortOrder: "desc" as const },
  { label: "Price: Low to High", sortBy: "price", sortOrder: "asc" as const },
  { label: "Price: High to Low", sortBy: "price", sortOrder: "desc" as const },
];

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group"
      whileHover={{ y: -6, scale: 1.02, boxShadow: "0 16px 40px -8px rgba(0,0,0,0.14)" }}
      whileTap={{ scale: 0.97 }}
      transition={springSnappy}
    >
      <Link href={paths.product(product.id)}>
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          {product.image ? (
            <Image src={getImageUrl(product.image)!} alt={product.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
          )}
          <span className="absolute top-2 left-2 text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{product.category}</span>
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={paths.product(product.id)}>
          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 hover:text-blue-600">{product.name}</h3>
        </Link>
        <p className="text-blue-600 font-bold text-lg mb-3">${product.price.toLocaleString("en-US")}</p>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
            {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
          </span>
          <motion.button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            whileHover={product.stock > 0 ? { scale: 1.08 } : {}}
            whileTap={product.stock > 0 ? { scale: 0.9 } : {}}
            transition={springBouncy}
            className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded-lg"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function Skeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-8 bg-gray-200 rounded w-full mt-3" />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const user = useSelector(selectAuthUser) as any;
  const router = useRouter();
  const [addToCart] = useAddToCartMutation();
  const searchParams = useSearchParams();

  const catParam = searchParams.get("category") ?? "";
  const searchParam = searchParams.get("search") ?? "";

  const [search, setSearch] = useState(searchParam);
  const [debouncedSearch, setDebouncedSearch] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(catParam);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedMin, setAppliedMin] = useState<number | undefined>();
  const [appliedMax, setAppliedMax] = useState<number | undefined>();
  const [sortIdx, setSortIdx] = useState(0);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSelectedCategory(catParam);
    setSearch(searchParam);
    setDebouncedSearch(searchParam);
    setAppliedMin(undefined);
    setAppliedMax(undefined);
    setPage(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catParam, searchParam]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const sort = SORT_OPTIONS[sortIdx];
  const { data: productsData, isLoading } = useGetProductsQuery({
    page, limit: 12,
    search: debouncedSearch || undefined,
    category: selectedCategory || undefined,
    minPrice: appliedMin, maxPrice: appliedMax,
    sortBy: sort.sortBy, sortOrder: sort.sortOrder,
  });
  const { data: categoriesData } = useGetCategoryNamesQuery();

  const categories = categoriesData?.data || [];
  const products = productsData?.data || [];
  const totalPages = productsData?.totalPages || 1;

  const handleAddToCart = useCallback(async (product: Product) => {
    if (!user || Object.keys(user).length === 0) {
      toast.error("Please sign in to add items to cart");
      return;
    }
    try {
      await addToCart({ productId: product.id, quantity: 1 }).unwrap();
      toast.success(`${product.name} added to cart`);
    } catch {
      toast.error("Failed to add to cart");
    }
  }, [user, addToCart]);

  const applyPrice = () => {
    setAppliedMin(minPrice ? Number(minPrice) : undefined);
    setAppliedMax(maxPrice ? Number(maxPrice) : undefined);
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory(""); setMinPrice(""); setMaxPrice("");
    setAppliedMin(undefined); setAppliedMax(undefined); setPage(1);
    router.push(paths.products);
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flex flex-col sm:flex-row gap-3 mb-6"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search products…" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <select value={sortIdx} onChange={e => { setSortIdx(Number(e.target.value)); setPage(1); }} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          {SORT_OPTIONS.map((o, i) => <option key={o.label} value={i}>{o.label}</option>)}
        </select>
        <motion.button onClick={() => setShowFilters(v => !v)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={springSnappy} className="sm:hidden px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-white">
          Filters {showFilters ? "▲" : "▼"}
        </motion.button>
      </motion.div>

      <div className="flex gap-6">
        <motion.aside
          className={`${showFilters ? "block" : "hidden"} sm:block w-full sm:w-56 flex-shrink-0`}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-5 sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <motion.button onClick={clearFilters} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} transition={springSnappy} className="text-xs text-blue-600 hover:underline">Clear all</motion.button>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Category</p>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="cat" value="" checked={selectedCategory === ""} onChange={() => { setSelectedCategory(""); setPage(1); }} className="text-blue-600" />
                  <span className="text-sm text-gray-700">All</span>
                </label>
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="cat" value={cat} checked={selectedCategory === cat} onChange={() => { setSelectedCategory(cat); setPage(1); }} className="text-blue-600" />
                    <span className="text-sm text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Price Range ($)</p>
              <div className="flex gap-2 mb-2">
                <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min" className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
                <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max" className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <motion.button onClick={applyPrice} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }} transition={springBouncy} className="w-full py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700">Apply</motion.button>
            </div>
          </div>
        </motion.aside>

        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <motion.div className="flex flex-col items-center justify-center py-20 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...springBouncy }}>
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
              <motion.button onClick={clearFilters} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} transition={springBouncy} className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Clear Filters</motion.button>
            </motion.div>
          ) : (
            <>
              <motion.p className="text-sm text-gray-500 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>{productsData?.total || 0} products</motion.p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${debouncedSearch}-${selectedCategory}-${page}`}
                  className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                >
                  {products.map(p => (
                    <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 24, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 320, damping: 22 } } }}>
                      <ProductCard product={p} onAddToCart={handleAddToCart} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50">← Prev</button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pg = totalPages <= 5 ? i + 1 : Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                    return (
                      <button key={pg} onClick={() => setPage(pg)} className={`w-9 h-9 rounded-lg text-sm font-medium ${pg === page ? "bg-blue-600 text-white" : "border border-gray-200 hover:bg-gray-50"}`}>{pg}</button>
                    );
                  })}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50">Next →</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
