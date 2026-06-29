"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetCartQuery } from "@services/cart-api";
import { useCreateOrderMutation } from "@services/orders-api";
import { useSelector } from "@store/index";
import { selectAuthUser } from "@slices/auth";
import toast from "react-hot-toast";
import type { ShippingAddress } from "@root/types";
import { paths } from "@root/paths";

const SHIP_FEE = 99;
const FREE_SHIP_THRESHOLD = 999;

export default function CheckoutPage() {
  const router = useRouter();
  const user = useSelector(selectAuthUser) as any;
  const isLoggedIn = user && Object.keys(user).length > 0;
  const { data } = useGetCartQuery(undefined, { skip: !isLoggedIn });
  const [createOrder, { isLoading: ordering }] = useCreateOrderMutation();

  const [form, setForm] = useState<ShippingAddress>({
    name: user?.name || "", address: "", city: "", state: "", zip: "", country: "India",
  });
  const [errors, setErrors] = useState<Partial<ShippingAddress>>({});

  const cart = data?.data;
  const items = cart?.items || [];
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIP_THRESHOLD ? 0 : SHIP_FEE;
  const total = subtotal + shipping;

  if (!isLoggedIn) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Please sign in to checkout</h2>
        <Link href={paths.login} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">Sign In</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
        <Link href={paths.products} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">Shop Now</Link>
      </div>
    );
  }

  const validate = (): boolean => {
    const e: Partial<ShippingAddress> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state.trim()) e.state = "Required";
    if (!form.zip.trim()) e.zip = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handlePlaceOrder = async () => {
    if (!validate()) { toast.error("Please fill in all required fields"); return; }
    const paymentIntent = `pi_test_${Date.now()}`;
    try {
      await createOrder({ shippingAddress: form, paymentIntent }).unwrap();
      toast.success("Order placed successfully!");
      router.push(paths.orderSuccess);
    } catch (err: unknown) {
      const msg = (err as { data?: { message?: string } })?.data?.message || "Failed to place order";
      toast.error(msg);
    }
  };

  const inputCls = (field: keyof ShippingAddress) =>
    `w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition ${errors[field] ? "border-red-400 bg-red-50 focus:ring-red-400" : "border-gray-200 focus:ring-blue-500"}`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Shipping */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Full Name *</label>
                <input value={form.name} onChange={e => handleChange("name", e.target.value)} className={inputCls("name")} placeholder="John Doe"/>
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Street Address *</label>
                <input value={form.address} onChange={e => handleChange("address", e.target.value)} className={inputCls("address")} placeholder="123 Main Street"/>
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">City *</label>
                <input value={form.city} onChange={e => handleChange("city", e.target.value)} className={inputCls("city")} placeholder="Mumbai"/>
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">State *</label>
                <input value={form.state} onChange={e => handleChange("state", e.target.value)} className={inputCls("state")} placeholder="Maharashtra"/>
                {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">PIN Code *</label>
                <input value={form.zip} onChange={e => handleChange("zip", e.target.value)} className={inputCls("zip")} placeholder="400001"/>
                {errors.zip && <p className="text-xs text-red-500 mt-1">{errors.zip}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Country</label>
                <input value={form.country} onChange={e => handleChange("country", e.target.value)} className={inputCls("country")} placeholder="India"/>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Payment</h2>
              <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full">TEST MODE</span>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-xs text-yellow-700">
              🧪 This is a test payment. No real charges will be made. Use any card details below.
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Card Number</label>
                <input defaultValue="4242 4242 4242 4242" disabled
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-400 cursor-not-allowed"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Expiry</label>
                  <input defaultValue="12/26" disabled
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-400 cursor-not-allowed"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">CVV</label>
                  <input defaultValue="123" disabled
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-400 cursor-not-allowed"/>
                </div>
              </div>
            </div>
          </div>

          <button onClick={handlePlaceOrder} disabled={ordering}
            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {ordering
              ? <><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Placing Order…</>
              : `Place Order — ₹${total.toLocaleString("en-IN")}`
            }
          </button>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 h-fit sticky top-24">
          <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {items.map(item => (
              <div key={item.productId} className="flex gap-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                  {item.product.image
                    ? <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover"/>
                    : <div className="w-full h-full flex items-center justify-center text-xl">📦</div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 line-clamp-2">{item.product.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                </div>
                <p className="text-xs font-bold text-gray-900 whitespace-nowrap">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</p>
              </div>
            ))}
          </div>
          <div className="h-px bg-gray-100 my-3"/>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between text-gray-600"><span>Shipping</span><span className={shipping === 0 ? "text-green-600 font-medium" : ""}>{shipping === 0 ? "FREE" : `₹${SHIP_FEE}`}</span></div>
            <div className="h-px bg-gray-100"/>
            <div className="flex justify-between font-bold text-gray-900"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
