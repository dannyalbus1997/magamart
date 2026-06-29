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
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* Top Info Bar — subtle gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-white/90">
          <span className="font-medium tracking-wide">Welcome to worldwide MegaMart!</span>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
              <MapPin size={12} className="text-blue-200" />
              Deliver to <strong className="text-white ml-1">423661</strong>
            </span>
            <span className="w-px h-3 bg-white/30" />
            <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
              <Package size={12} className="text-blue-200" />
              Track your order
            </span>
            <span className="w-px h-3 bg-white/30" />
            <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
              <Tag size={12} className="text-blue-200" />
              All Offers
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100 py-3 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Hamburger + Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="text-gray-500 hover:text-blue-600 transition-colors p-1">
              <Menu size={22} />
            </button>
            <Link href={paths.home} className="flex items-center gap-1.5">
              {/* Gradient icon badge */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                <svg viewBox="0 0 20 20" fill="none" className="w-4.5 h-4.5 w-[18px] h-[18px]">
                  <path d="M5 8h10l-1.2 7.5a.8.8 0 01-.8.7H7a.8.8 0 01-.8-.7L5 8z" fill="none" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
                  <path d="M8 8V5.5a2 2 0 014 0V8" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
              {/* Gradient text logo */}
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MegaMart
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <div className="flex items-center rounded-xl overflow-hidden shadow-sm border-2 border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 p-[2px]">
              <div className="flex flex-1 bg-white rounded-[10px] overflow-hidden">
                <input
                  type="text"
                  placeholder="Search essentials, groceries and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all px-5 py-2.5 flex items-center justify-center"
                >
                  <Search size={18} className="text-white" />
                </button>
              </div>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button className="text-gray-500 hover:text-indigo-600 transition-colors p-1">
              <SlidersHorizontal size={20} />
            </button>

            {/* Sign In / User */}
            {isLoggedIn ? (
              <Link
                href={user?.role === "admin" ? paths.admin.root : paths.dashboard}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                  <User size={15} className="text-white" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-gray-400">Hello,</span>
                  <span className="text-xs font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {user?.firstName || user?.email?.split("@")[0] || "Account"}
                  </span>
                </div>
              </Link>
            ) : (
              <Link
                href={paths.login}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-indigo-600 flex items-center justify-center transition-all">
                  <User size={15} className="text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-gray-400">Hello, Sign in</span>
                  <span className="text-xs font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Sign Up/Sign In</span>
                </div>
              </Link>
            )}

            {/* Cart */}
            <Link
              href={paths.cart}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group relative"
            >
              <div className="relative">
                <ShoppingCart size={22} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
                <span className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              </div>
              <span className="text-xs font-semibold group-hover:text-blue-600 transition-colors">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white border-b border-gray-100 overflow-x-auto shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1">
            {categories.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-4 w-24 bg-gradient-to-r from-blue-50 to-indigo-50 rounded animate-pulse my-3 mx-1" />
                ))
              : categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`flex items-center gap-1 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full my-2 px-5 shadow-md shadow-blue-200"
                        : "text-gray-600 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-400"
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
