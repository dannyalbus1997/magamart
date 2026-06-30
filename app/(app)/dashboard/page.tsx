"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthGuard } from "@root/guards";
import { useSelector } from "@store/index";
import { selectAuthUser } from "@slices/auth";
import { useGetMyOrdersQuery } from "@services/orders-api";
import { getImageUrl } from "@shared/utils";
import { paths } from "@root/paths";
import type { Order, OrderStatus } from "@root/types";

const STATUS_STYLES: Record<OrderStatus, { dot: string; badge: string; label: string }> = {
  pending:    { dot: "bg-yellow-400", badge: "bg-yellow-100 text-yellow-700", label: "Pending" },
  processing: { dot: "bg-blue-400",   badge: "bg-blue-100 text-blue-700",     label: "Processing" },
  shipped:    { dot: "bg-purple-400", badge: "bg-purple-100 text-purple-700", label: "Shipped" },
  delivered:  { dot: "bg-green-400",  badge: "bg-green-100 text-green-700",   label: "Delivered" },
  cancelled:  { dot: "bg-red-400",    badge: "bg-red-100 text-red-700",       label: "Cancelled" },
};

function StatCard({ label, value, icon, sub }: { label: string; value: number | string; icon: string; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-extrabold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
        {sub && <p className="text-xs text-blue-600 font-medium mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function OrderRow({ order }: { order: Order }) {
  const st = STATUS_STYLES[order.status] ?? STATUS_STYLES.pending;
  const firstItem = order.items[0];
  const imgUrl = firstItem?.product?.image ? getImageUrl(firstItem.product.image) : null;
  const extra = order.items.length - 1;

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Order */}
      <td className="px-4 py-3">
        <p className="text-sm font-semibold text-gray-900">#{order.id.slice(-8).toUpperCase()}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {new Date(order.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
        </p>
      </td>

      {/* Items preview */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
            {imgUrl
              ? <Image src={imgUrl} alt={firstItem?.product?.name ?? ""} fill sizes="40px" className="object-cover"/>
              : <div className="w-full h-full flex items-center justify-center text-lg">📦</div>
            }
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-800 font-medium truncate max-w-[140px]">
              {firstItem?.product?.name ?? "Product"}
            </p>
            {extra > 0 && <p className="text-xs text-gray-400">+{extra} more item{extra > 1 ? "s" : ""}</p>}
          </div>
        </div>
      </td>

      {/* Total */}
      <td className="px-4 py-3 font-bold text-gray-900 text-sm">
        ${order.total.toLocaleString("en-US")}
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${st.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
          {st.label}
        </span>
      </td>

      {/* Action */}
      <td className="px-4 py-3">
        <Link href={paths.orders} className="text-xs text-blue-600 hover:underline font-medium">
          View
        </Link>
      </td>
    </tr>
  );
}

function DashboardContent() {
  const user = useSelector(selectAuthUser) as any;
  const { data, isLoading } = useGetMyOrdersQuery();

  const orders: Order[] = (data?.data ?? []);
  const recentOrders = orders.slice(0, 5);

  const totalOrders   = orders.length;
  const pendingOrders = orders.filter(o => o.status === "pending" || o.status === "processing").length;
  const delivered     = orders.filter(o => o.status === "delivered").length;
  const totalSpent    = orders.reduce((sum, o) => sum + (o.total ?? 0), 0);

  const firstName = user?.firstName || user?.email?.split("@")[0] || "there";

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-md">
        <p className="text-blue-200 text-sm mb-1">Good to see you,</p>
        <h2 className="text-2xl font-extrabold capitalize">{firstName} 👋</h2>
        <p className="text-blue-100 text-sm mt-1">Here's a summary of your activity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Orders"  value={totalOrders}   icon="🧾" />
        <StatCard label="Active Orders" value={pendingOrders} icon="🔄" sub={pendingOrders > 0 ? "In progress" : undefined} />
        <StatCard label="Delivered"     value={delivered}     icon="✅" />
        <StatCard label="Total Spent"   value={`$${totalSpent.toLocaleString("en-US")}`} icon="💳" />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Recent Orders</h3>
          <Link href={paths.orders} className="text-sm text-blue-600 hover:underline font-medium">
            View all →
          </Link>
        </div>

        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-semibold text-gray-700 mb-1">No orders yet</p>
            <p className="text-sm text-gray-400 mb-4">Start shopping and your orders will appear here.</p>
            <Link href={paths.products}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Order ID", "Item(s)", "Total", "Status", ""].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map(order => <OrderRow key={order.id} order={order} />)}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { href: paths.products, icon: "🛍️", label: "Shop Now",     sub: "Browse products" },
          { href: paths.cart,     icon: "🛒", label: "My Cart",      sub: "View saved items" },
          { href: paths.orders,   icon: "📦", label: "All Orders",   sub: "Track your orders" },
        ].map(link => (
          <Link key={link.href} href={link.href}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md hover:border-blue-200 transition group">
            <span className="text-2xl">{link.icon}</span>
            <div>
              <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">{link.label}</p>
              <p className="text-xs text-gray-400">{link.sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
