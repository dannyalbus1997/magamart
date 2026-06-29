"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  Package,
  Tag,
  Menu,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

const categories = [
  { label: "Groceries", active: true },
  { label: "Premium Fruits" },
  { label: "Home & Kitchen" },
  { label: "Fashion" },
  { label: "Electronics" },
  { label: "Beauty" },
  { label: "Home Improvement" },
  { label: "Sports, Toys & Luggage" },
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Groceries");

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
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-extrabold tracking-tight text-blue-600">
                Mega<span className="text-blue-500">Mart</span>
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="flex items-center border-2 border-blue-500 rounded-lg overflow-hidden bg-white">
              <input
                type="text"
                placeholder="Search essentials, groceries and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
              />
              <button className="bg-blue-500 hover:bg-blue-600 transition-colors px-5 py-2.5 flex items-center justify-center">
                <Search size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button className="text-gray-600 hover:text-blue-600 transition-colors p-1">
              <SlidersHorizontal size={20} />
            </button>

            {/* Sign In */}
            <Link
              href="/login"
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

            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group relative"
            >
              <div className="relative">
                <ShoppingCart size={22} className="text-gray-700 group-hover:text-blue-600" />
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
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
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`flex items-center gap-1 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all rounded-none border-b-2 ${
                  activeCategory === cat.label
                    ? "text-white bg-blue-500 border-blue-500 rounded-full my-2 px-5 border-0"
                    : "text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-300"
                }`}
              >
                {cat.label}
                {cat.label !== "Groceries" && activeCategory !== cat.label && (
                  <ChevronDown size={12} className="text-gray-400" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
