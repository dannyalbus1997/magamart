"use client";

import { useState } from "react";
import { AdminGuard } from "@root/guards";
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "@services/orders-api";
import toast from "react-hot-toast";
import type { OrderStatus } from "@root/types";

const STATUSES: OrderStatus[] = ["pending","processing","shipped","delivered","cancelled"];

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ["processing","cancelled"],
  processing: ["shipped","cancelled"],
  shipped: ["delivered","cancelled"],
  delivered: [],
  cancelled: [],
};

function StatusSelect({ orderId, current }: { orderId: string; current: OrderStatus }) {
  const [updateStatus, { isLoading }] = useUpdateOrderStatusMutation();
  const options = TRANSITIONS[current];

  if (options.length === 0) {
    return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[current]}`}>{current}</span>;
  }

  return (
    <select
      defaultValue={current}
      disabled={isLoading}
      onChange={async (e) => {
        try {
          await updateStatus({ id: orderId, status: e.target.value }).unwrap();
          toast.success("Order status updated");
        } catch {
          toast.error("Failed to update status");
        }
      }}
      className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${STATUS_STYLES[current]} disabled:opacity-60`}
    >
      <option value={current}>{current.charAt(0).toUpperCase() + current.slice(1)}</option>
      {options.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
    </select>
  );
}

export default function AdminOrdersPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllOrdersQuery({
    page, limit: 15,
    status: filterStatus === "all" ? undefined : filterStatus,
  });

  const orders = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <AdminGuard>
      <div className="space-y-5">
        <h2 className="text-xl font-bold text-gray-900">Orders</h2>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {["all", ...STATUSES].map(s => (
            <button key={s} onClick={() => { setFilterStatus(s); setPage(1); }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition ${filterStatus === s ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{["Order ID","Customer","Date","Items","Total","Status","Action"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading
                ? Array.from({length:10}).map((_,i) => (
                    <tr key={i} className="animate-pulse">
                      {Array.from({length:7}).map((_,j) => <td key={j} className="px-4 py-3"><div className="h-4 bg-gray-200 rounded"/></td>)}
                    </tr>
                  ))
                : orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">#{order.id.slice(-8).toUpperCase()}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{(order as any).user?.name || order.userId?.slice(0,8) || "—"}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
                        {new Date(order.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</td>
                      <td className="px-4 py-3 font-bold text-gray-900">₹{order.total.toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[order.status]}`}>{order.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusSelect orderId={order.id} current={order.status}/>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>

          {!isLoading && orders.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-2">🧾</p>
              <p className="text-sm">No orders found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50">← Prev</button>
            {Array.from({length:Math.min(5,totalPages)},(_,i)=>i+1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg text-sm font-medium ${p===page?"bg-blue-600 text-white":"border border-gray-200 hover:bg-gray-50"}`}>{p}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50">Next →</button>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
