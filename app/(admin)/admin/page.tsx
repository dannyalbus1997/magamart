"use client";

import dynamic from "next/dynamic";
import { AdminGuard } from "@root/guards";
import { useGetAnalyticsQuery } from "@services/analytics-api";
import type { AnalyticsSummary } from "@root/types";

const CustomChart = dynamic(() => import("@components/charts/Chart").then(m => m.CustomChart), { ssr: false });

const MOCK: AnalyticsSummary = {
  totalSales: 1250000,
  totalOrders: 342,
  totalProducts: 89,
  totalCustomers: 1205,
  ordersByStatus: { pending: 45, processing: 78, shipped: 102, delivered: 112, cancelled: 5 },
  topProducts: [],
  salesByDay: [
    { date: "Mon", sales: 42000, orders: 12 },
    { date: "Tue", sales: 68000, orders: 18 },
    { date: "Wed", sales: 55000, orders: 15 },
    { date: "Thu", sales: 89000, orders: 24 },
    { date: "Fri", sales: 120000, orders: 32 },
    { date: "Sat", sales: 95000, orders: 28 },
    { date: "Sun", sales: 71000, orders: 20 },
  ],
};

const STAT_CARDS = [
  { key: "totalSales", label: "Total Sales", icon: "💰", color: "bg-blue-50 text-blue-600", format: (v: number) => `$${(v / 100000).toFixed(1)}L` },
  { key: "totalOrders", label: "Total Orders", icon: "🧾", color: "bg-green-50 text-green-600", format: (v: number) => v.toLocaleString() },
  { key: "totalProducts", label: "Products", icon: "📦", color: "bg-purple-50 text-purple-600", format: (v: number) => v.toLocaleString() },
  { key: "totalCustomers", label: "Customers", icon: "👥", color: "bg-orange-50 text-orange-600", format: (v: number) => v.toLocaleString() },
] as const;

const STATUS_COLORS = ["#3b82f6","#f59e0b","#8b5cf6","#22c55e","#ef4444"];

export default function AdminDashboard() {
  const { data: apiData, isLoading } = useGetAnalyticsQuery();
  const analytics: AnalyticsSummary = apiData?.data ?? MOCK;

  return (
    <AdminGuard>
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>

        {/* Stat cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {STAT_CARDS.map(card => {
            const val = analytics[card.key as keyof AnalyticsSummary] as number;
            return (
              <div key={card.key} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                {isLoading
                  ? <div className="animate-pulse space-y-3"><div className="h-10 w-10 bg-gray-200 rounded-xl"/><div className="h-8 bg-gray-200 rounded w-24"/><div className="h-4 bg-gray-200 rounded w-20"/></div>
                  : <>
                      <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center text-xl mb-3`}>{card.icon}</div>
                      <p className="text-2xl font-extrabold text-gray-900">{card.format(val)}</p>
                      <p className="text-sm text-gray-500 mt-1">{card.label}</p>
                    </>
                }
              </div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Sales area chart */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Sales This Week</h3>
            <CustomChart
              type="area"
              series={[{ name: "Sales ($)", data: analytics.salesByDay.map(d => d.sales) }]}
              options={{
                xaxis: { categories: analytics.salesByDay.map(d => d.date) },
                colors: ["#3b82f6"],
                fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
                stroke: { curve: "smooth", width: 2 },
                dataLabels: { enabled: false },
                grid: { borderColor: "#f1f5f9" },
                tooltip: { y: { formatter: (v: number) => `$${v.toLocaleString("en-US")}` } },
              }}
              height="260"
            />
          </div>

          {/* Order status donut */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Orders by Status</h3>
            <CustomChart
              type="donut"
              series={Object.values(analytics.ordersByStatus)}
              options={{
                labels: Object.keys(analytics.ordersByStatus).map(s => s.charAt(0).toUpperCase() + s.slice(1)),
                colors: STATUS_COLORS,
                legend: { position: "bottom", fontSize: "12px" },
                plotOptions: { pie: { donut: { size: "65%" } } },
                dataLabels: { enabled: false },
              }}
              height="260"
            />
          </div>
        </div>

        {/* Top products */}
        {analytics.topProducts.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">Top Selling Products</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>{["#","Product","Category","Units Sold","Revenue"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {analytics.topProducts.slice(0, 5).map((tp, i) => (
                  <tr key={tp.product.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-bold text-gray-400">{i + 1}</td>
                    <td className="px-5 py-3 font-medium text-gray-900">{tp.product.name}</td>
                    <td className="px-5 py-3 text-gray-500">{tp.product.category}</td>
                    <td className="px-5 py-3 font-semibold text-blue-600">{tp.totalSold}</td>
                    <td className="px-5 py-3 font-semibold text-green-600">${tp.revenue.toLocaleString("en-US")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
