"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useGetMyOrdersQuery } from "@services/orders-api";
import { useSelector } from "@store/index";
import { selectAuthUser } from "@slices/auth";
import type { Order, OrderStatus } from "@root/types";
import { paths } from "@root/paths";
import { getImageUrl } from "@shared/utils";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

function OrderCard({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const date = new Date(order.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  const firstItem = order.items[0];
  const extra = order.items.length - 1;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer hover:bg-gray-50 transition" onClick={() => setOpen(v => !v)}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-gray-400">#{order.id.slice(-8).toUpperCase()}</span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${STATUS_STYLES[order.status]}`}>{order.status}</span>
          </div>
          <p className="text-sm text-gray-700 font-medium truncate">
            {firstItem?.product?.name || "Order"}{extra > 0 ? ` + ${extra} more` : ""}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{date}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-base font-bold text-gray-900">${order.total.toLocaleString("en-US")}</span>
          <span className="text-gray-400 text-sm">{open ? "▲" : "▼"}</span>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          <div className="space-y-3 mb-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <div className="relative w-12 h-12 rounded-xl bg-white border border-gray-200 flex-shrink-0 overflow-hidden">
                  {item.product?.image
                    ? <Image src={getImageUrl(item.product.image)!} alt={item.product.name} fill sizes="48px" className="object-cover"/>
                    : <div className="w-full h-full flex items-center justify-center text-xl">📦</div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.product?.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity} × ${item.price?.toLocaleString("en-US")}</p>
                </div>
                <p className="text-sm font-bold text-gray-900">${((item.price || 0) * item.quantity).toLocaleString("en-US")}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-200 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">Shipping Address</p>
              {order.shippingAddress && (
                <p className="text-gray-500 text-xs leading-relaxed">
                  {order.shippingAddress.name}<br/>
                  {order.shippingAddress.address}, {order.shippingAddress.city}<br/>
                  {order.shippingAddress.state} {order.shippingAddress.zip}, {order.shippingAddress.country}
                </p>
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-1">Payment</p>
              <p className="text-xs text-gray-500 capitalize">{order.paymentStatus || "—"}</p>
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${order.subtotal?.toLocaleString("en-US") || "—"}</span></div>
                <div className="flex justify-between font-bold text-gray-900"><span>Total</span><span>${order.total.toLocaleString("en-US")}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const [showBanner, setShowBanner] = useState(!!success);
  const user = useSelector(selectAuthUser) as any;
  const isLoggedIn = user && Object.keys(user).length > 0;
  const { data, isLoading } = useGetMyOrdersQuery(undefined, { skip: !isLoggedIn });
  const orders = data?.data || [];

  useEffect(() => {
    if (showBanner) { const t = setTimeout(() => setShowBanner(false), 5000); return () => clearTimeout(t); }
  }, [showBanner]);

  if (!isLoggedIn) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Sign in to view orders</h2>
        <Link href={paths.login} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {showBanner && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="font-semibold text-green-800">Order placed successfully!</p>
              <p className="text-sm text-green-600">You will receive a confirmation email shortly.</p>
            </div>
          </div>
          <button onClick={() => setShowBanner(false)} className="text-green-400 hover:text-green-600 text-xl">×</button>
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-200 rounded-2xl"/>)}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-7xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">Start shopping and your orders will appear here</p>
          <Link href={paths.products} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">Shop Now</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => <OrderCard key={order.id} order={order}/>)}
        </div>
      )}
    </div>
  );
}
