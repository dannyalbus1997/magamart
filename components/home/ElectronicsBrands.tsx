"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { SlideUp, StaggerContainer, StaggerItem, springBouncy, springSnappy } from "@components/animations";

const brands = [
  {
    id: 1,
    name: "iPhone",
    tag: "IPHONE",
    offer: "UP to 80% OFF",
    bgColor: "bg-gray-900",
    tagColor: "text-gray-300",
    offerColor: "text-white",
    logo: (
      <svg viewBox="0 0 80 80" className="w-14 h-14" fill="none">
        <path d="M55.48 42.5c-.09-8.6 7.04-12.75 7.35-12.95-4.01-5.86-10.24-6.67-12.46-6.75-5.29-.54-10.36 3.12-13.04 3.12-2.7 0-6.84-3.05-11.24-2.97-5.75.09-11.07 3.35-14.04 8.49-6 10.37-1.54 25.7 4.29 34.11 2.86 4.12 6.25 8.74 10.69 8.58 4.3-.17 5.93-2.77 11.13-2.77 5.2 0 6.67 2.77 11.23 2.69 4.61-.08 7.54-4.19 10.37-8.33 3.29-4.77 4.64-9.41 4.71-9.65-.1-.04-9.01-3.46-9.09-13.57zM47.14 17.38c2.35-2.87 3.94-6.84 3.5-10.83-3.39.14-7.55 2.27-9.99 5.1-2.17 2.53-4.09 6.6-3.58 10.47 3.78.29 7.66-1.93 10.07-4.74z" fill="white" />
      </svg>
    ),
    phoneColor: "#ffffff",
  },
  {
    id: 2,
    name: "Realme",
    tag: "REALME",
    offer: "UP to 80% OFF",
    bgColor: "bg-yellow-400",
    tagColor: "text-yellow-800",
    offerColor: "text-yellow-900",
    logo: (
      <svg viewBox="0 0 120 40" className="w-24 h-10" fill="none">
        <text x="0" y="30" fontFamily="Arial" fontWeight="900" fontSize="28" fill="#000">realme</text>
      </svg>
    ),
    phoneColor: "#000000",
  },
  {
    id: 3,
    name: "Xiaomi",
    tag: "XIAOMI",
    offer: "UP to 80% OFF",
    bgColor: "bg-orange-500",
    tagColor: "text-orange-100",
    offerColor: "text-white",
    logo: (
      <svg viewBox="0 0 60 60" className="w-12 h-12" fill="none">
        <rect x="5" y="5" width="50" height="50" rx="10" fill="#ff6900" />
        <text x="30" y="38" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="20" fill="white">mi</text>
      </svg>
    ),
    phoneColor: "#ffffff",
  },
];

function PhoneSilhouette({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 180" className="w-20 h-36" fill="none">
      <rect x="15" y="5" width="70" height="170" rx="14" fill={color} fillOpacity="0.15" stroke={color} strokeOpacity="0.3" strokeWidth="1.5" />
      <rect x="20" y="14" width="60" height="148" rx="10" fill={color} fillOpacity="0.08" />
      <rect x="35" y="5" width="30" height="8" rx="4" fill={color} fillOpacity="0.2" />
      <circle cx="50" cy="9" r="2" fill={color} fillOpacity="0.4" />
      <rect x="30" y="165" width="40" height="3" rx="1.5" fill={color} fillOpacity="0.3" />
    </svg>
  );
}

export default function ElectronicsBrands() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <SlideUp className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Top <span className="text-blue-500">Electronics Brands</span>
          </h2>
          <motion.div whileHover={{ x: 4 }} transition={springSnappy}>
            <Link href="#" className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
              View All <ChevronRight size={16} />
            </Link>
          </motion.div>
        </SlideUp>

        <div className="relative">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4" stagger={0.1}>
            {brands.map((brand) => (
              <StaggerItem key={brand.id}>
                <motion.div whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={springSnappy}>
                  <Link href="#" className={"relative overflow-hidden rounded-2xl " + brand.bgColor + " p-5 flex items-center justify-between min-h-[130px] block"}>
                    <div className="z-10">
                      <span className={"text-xs font-bold tracking-widest " + brand.tagColor + " block mb-1"}>{brand.tag}</span>
                      <div className="mb-3">{brand.logo}</div>
                      <span className={"text-sm font-bold " + brand.offerColor}>{brand.offer}</span>
                    </div>
                    <motion.div
                      className="opacity-80"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2.8 + brand.id * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <PhoneSilhouette color={brand.phoneColor} />
                    </motion.div>
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="flex justify-center gap-2 mt-4">
            {brands.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrent(i)}
                animate={{ width: i === current ? 20 : 8, backgroundColor: i === current ? "#3b82f6" : "#d1d5db" }}
                whileHover={{ scale: 1.3 }}
                transition={springSnappy}
                className="h-2 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
