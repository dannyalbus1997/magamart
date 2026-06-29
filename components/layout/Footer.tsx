import React from "react";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

const popularCategories = [
  "Staples",
  "Beverages",
  "Personal Care",
  "Home Care",
  "Baby Care",
  "Vegetables & Fruits",
  "Snacks & Foods",
  "Dairy & Bakery",
];

const customerServices = [
  { label: "About Us", href: "/about" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "E-waste Policy", href: "/e-waste" },
  { label: "Cancellation & Return Policy", href: "/returns" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a75d1] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand + Contact */}
          <div className="space-y-5">
            <h2 className="text-2xl font-extrabold tracking-tight">MegaMart</h2>

            {/* Contact */}
            <div>
              <p className="text-sm font-semibold text-blue-100 mb-3">Contact Us</p>
              <div className="space-y-2">
                <a
                  href="https://wa.me/12029182132"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-100 hover:text-white transition-colors"
                >
                  <MessageCircle size={15} />
                  <div>
                    <p className="text-[10px] text-blue-200">Whats App</p>
                    <p className="font-medium">+1 202-918-2132</p>
                  </div>
                </a>
                <a
                  href="tel:12029182132"
                  className="flex items-center gap-2 text-sm text-blue-100 hover:text-white transition-colors"
                >
                  <Phone size={15} />
                  <div>
                    <p className="text-[10px] text-blue-200">Call Us</p>
                    <p className="font-medium">+1 202-918-2132</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Download App */}
            <div>
              <p className="text-sm font-semibold text-blue-100 mb-3">Download App</p>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="flex items-center gap-1.5 bg-black/30 hover:bg-black/50 transition-colors rounded-lg px-3 py-2 border border-white/20"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="leading-tight">
                    <p className="text-[8px] text-white/70">Download on the</p>
                    <p className="text-xs font-semibold">App Store</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-1.5 bg-black/30 hover:bg-black/50 transition-colors rounded-lg px-3 py-2 border border-white/20"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M3.18 23.76c.3.17.64.22.99.14l12.47-7.18-2.59-2.59zM1.5 1.77C1.18 2.1 1 2.6 1 3.25v17.5c0 .65.18 1.15.5 1.48L1.58 22.3l9.8-9.8v-.23L1.58 2.47zM20.49 10.7l-2.59-1.49-2.92 2.92 2.92 2.92 2.61-1.5c.74-.43.74-1.42-.02-1.85zM4.17.24L16.64 7.42l-2.59 2.59L4.17.24z" />
                  </svg>
                  <div className="leading-tight">
                    <p className="text-[8px] text-white/70">Get it on</p>
                    <p className="text-xs font-semibold">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-blue-100 mb-4">Most Popular Categories</h3>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-6">
              {popularCategories.map((cat) => (
                <li key={cat}>
                  <Link
                    href="#"
                    className="text-sm text-blue-100 hover:text-white transition-colors flex items-center gap-1.5 before:content-['•'] before:text-blue-300 before:text-lg before:leading-none"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h3 className="text-sm font-semibold text-blue-100 mb-4">Customer Services</h3>
            <ul className="space-y-2">
              {customerServices.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-blue-100 hover:text-white transition-colors flex items-center gap-1.5 before:content-['•'] before:text-blue-300 before:text-lg before:leading-none"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20 py-3 text-center text-xs text-blue-100">
        © 2022 All rights reserved. Reliance Retail Ltd.
      </div>
    </footer>
  );
}
