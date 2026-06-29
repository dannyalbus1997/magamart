import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Galaxy S22 Ultra",
    originalPrice: "₹74999",
    salePrice: "₹32999",
    savings: "₹32999",
    discount: 56,
    color: "#1a1a2e",
    screenColor: "#0f3460",
  },
  {
    id: 2,
    name: "Galaxy M13 (4GB | 64 GB)",
    originalPrice: "₹14999",
    salePrice: "₹10499",
    savings: "₹4500",
    discount: 56,
    color: "#16213e",
    screenColor: "#e94560",
  },
  {
    id: 3,
    name: "Galaxy M33 (4GB | 64 GB)",
    originalPrice: "₹24999",
    salePrice: "₹16999",
    savings: "₹8000",
    discount: 56,
    color: "#0f3460",
    screenColor: "#533483",
  },
  {
    id: 4,
    name: "Galaxy M53 (4GB | 64 GB)",
    originalPrice: "₹40999",
    salePrice: "₹31999",
    savings: "₹9000",
    discount: 56,
    color: "#1b1b2f",
    screenColor: "#1f4068",
  },
  {
    id: 5,
    name: "Galaxy S22 Ultra",
    originalPrice: "₹85999",
    salePrice: "₹67999",
    savings: "₹18000",
    discount: 56,
    color: "#212121",
    screenColor: "#263238",
  },
];

function PhoneIcon({ bodyColor, screenColor }: { bodyColor: string; screenColor: string }) {
  return (
    <svg viewBox="0 0 120 180" className="w-24 h-36" fill="none">
      <rect x="15" y="5" width="90" height="170" rx="16" fill={bodyColor} />
      <rect x="20" y="12" width="80" height="156" rx="12" fill="#111" />
      <rect x="24" y="18" width="72" height="140" rx="9" fill={screenColor} fillOpacity="0.8" />
      {/* Notch */}
      <rect x="45" y="12" width="30" height="8" rx="4" fill={bodyColor} />
      {/* Camera dot */}
      <circle cx="60" cy="16" r="2.5" fill="#333" />
      {/* Status bar */}
      <rect x="28" y="22" width="20" height="2" rx="1" fill="white" fillOpacity="0.3" />
      <rect x="80" y="22" width="12" height="2" rx="1" fill="white" fillOpacity="0.3" />
      {/* Screen content blocks */}
      <rect x="28" y="40" width="64" height="50" rx="6" fill="white" fillOpacity="0.1" />
      <rect x="28" y="98" width="30" height="20" rx="4" fill="white" fillOpacity="0.1" />
      <rect x="62" y="98" width="30" height="20" rx="4" fill="white" fillOpacity="0.1" />
      <rect x="28" y="124" width="64" height="20" rx="4" fill="white" fillOpacity="0.1" />
      {/* Home bar */}
      <rect x="40" y="165" width="40" height="3" rx="1.5" fill="white" fillOpacity="0.4" />
      {/* Side buttons */}
      <rect x="103" y="50" width="4" height="28" rx="2" fill={bodyColor} />
      <rect x="13" y="50" width="4" height="18" rx="2" fill={bodyColor} />
      <rect x="13" y="74" width="4" height="18" rx="2" fill={bodyColor} />
    </svg>
  );
}

export default function SmartphonesSection() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Grab the best deal on{" "}
            <span className="text-blue-500">Smartphones</span>
          </h2>
          <Link
            href="#"
            className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((p) => (
            <Link
              key={p.id}
              href="#"
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group relative"
            >
              {/* Discount Badge */}
              <div className="absolute top-3 right-3 bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                {p.discount}%<br />OFF
              </div>

              {/* Product Image */}
              <div className="flex justify-center mb-3">
                <PhoneIcon bodyColor={p.color} screenColor={p.screenColor} />
              </div>

              {/* Product Info */}
              <h3 className="text-xs font-semibold text-gray-800 mb-1 leading-snug">{p.name}</h3>
              <div className="flex items-center gap-1 mb-0.5">
                <span className="text-sm font-bold text-gray-900">{p.salePrice}</span>
                <span className="text-xs text-gray-400 line-through">{p.originalPrice}</span>
              </div>
              <p className="text-xs text-green-600 font-medium">Save - {p.savings}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
