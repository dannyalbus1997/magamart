"use client";

import React, { useState } from "react";
import { paths } from "@root/paths";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, ShoppingCart, User, MapPin, Package, Tag, Menu, SlidersHorizontal, ChevronDown,
} from "lucide-react";
import { useSelector } from "@store/index";
import { selectAuthUser } from "@slices/auth";
import { useGetCategoryNamesQuery } from "@services/products-api";
import { useGetCartQuery } from "@services/cart-api";

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const user = useSelector(selectAuthUser) as any;
  const isLoggedIn = user && Object.keys(user).length > 0;

  const { data: categoryData } = useGetCategoryNamesQuery();
  const categories = categoryData?.data ?? [];

  const { data: cartData } = useGetCartQuery(undefined, { skip: !isLoggedIn });
  const cartCount = cartData?.data?.items?.length ?? 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`${paths.products}?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(paths.products);
    }
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    router.push(`${paths.products}?category=${encodeURIComponent(cat)}`);
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm">
      {/* Top Info Bar */}
      <div className="bg-[#f0f6ff] border-b border-blue-100 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-gray-600">
          <span className="font-medium">Welcome to worldwide Megamart!</span>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
              <MapPin size={12} className="text-blue-500" />
              Deliver to <strong className="text-gray-900 ml-1">423661</strong>
            </span>
            <span className="w-px h-3 bg-gray-300" />
            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
              <Package size={12} className="text-blue-500" />
              Track your order
            </span>
            <span className="w-px h-3 bg-gray-300" />
            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
              <Tag size={12} className="text-blue-500" />
              All Offers
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Hamburger + Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="text-gray-600 hover:text-blue-600 transition-colors p-1">
              <Menu size={22} />
            </button>
            <Link href={paths.home} className="flex items-center">
              <span className="text-2xl font-extrabold tracking-tight text-blue-600">
                Mega<span className="text-blue-500">Mart</span>
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <div className="flex items-center border-2 border-blue-500 rounded-lg overflow-hidden bg-white">
              <input
                type="text"
                placeholder="Search essentials, groceries and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
              />
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 transition-colors px-5 py-2.5 flex items-center justify-center">
                <Search size={18} className="text-white" />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button className="text-gray-600 hover:text-blue-600 transition-colors p-1">
              <SlidersHorizontal size={20} />
            </button>

            {/* Sign In / User */}
            {isLoggedIn ? (
              <Link
                href={user?.role === "admin" ? paths.admin.root : paths.dashboard}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <User size={16} className="text-blue-600" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-gray-400">Hello,</span>
                  <span className="text-xs font-semibold text-gray-800">
                    {user?.firstName || user?.email?.split("@")[0] || "Account"}
                  </span>
                </div>
              </Link>
            ) : (
              <Link
                href={paths.login}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <User size={16} className="text-gray-600 group-hover:text-blue-600" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-gray-400">Hello, Sign in</span>
                  <span className="text-xs font-semibold text-gray-800">Sign Up/Sign In</span>
                </div>
              </Link>
            )}

            {/* Cart */}
            <Link
              href={paths.cart}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group relative"
            >
              <div className="relative">
                <ShoppingCart size={22} className="text-gray-700 group-hover:text-blue-600" />
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              </div>
              <span className="text-xs font-semibold">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white border-b border-gray-100 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1">
            {categories.length === 0
              ? /* skeleton while loading */
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-4 w-24 bg-gray-100 rounded animate-pulse my-3 mx-1" />
                ))
              : categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`flex items-center gap-1 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all rounded-none border-b-2 ${
                      activeCategory === cat
                        ? "text-white bg-blue-500 border-blue-500 rounded-full my-2 px-5 border-0"
                        : "text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-300"
                    }`}
                  >
                    {cat}
                    {activeCategory !== cat && <ChevronDown size={12} className="text-gray-400" />}
                  </button>
                ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
