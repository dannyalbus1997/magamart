"use client";

import Link from "next/link";
import { useGetCartQuery, useUpdateCartItemMutation, useRemoveFromCartMutation } from "@services/cart-api";
import { useSelector } from "@store/index";
import { selectAuthUser } from "@slices/auth";
import toast from "react-hot-toast";
import { paths } from "@root/paths";

const FREE_SHIP_THRESHOLD = 999;
const SHIP_FEE = 99;

export default function CartPage() {
  const user = useSelector(selectAuthUser) as any;
  const isLoggedIn = user && Object.keys(user).length > 0;
  const { data, isLoading } = useGetCartQuery(undefined, { skip: !isLoggedIn });
  const [updateItem] = useUpdateCartItemMutation();
  const [removeItem] = useRemoveFromCartMutation();

  const cart = data?.data;
  const items = cart?.items || [];
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIP_THRESHOLD ? 0 : SHIP_FEE;
  const total = subtotal + shipping;

  if (!isLoggedIn) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-7xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Sign in to view your cart</h2>
        <p className="text-gray-500 mb-8">Your cart items are saved when you sign in</p>
        <div className="flex gap-3 justify-center">
          <Link href={paths.login} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">Sign In</Link>
          <Link href={paths.products} className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-40 mb-6"/>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {[1,2,3].map(i => <div key={i} className="h-28 bg-gray-200 rounded-2xl"/>)}
          </div>
          <div className="h-64 bg-gray-200 rounded-2xl"/>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-7xl mb-6">🛍️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some products to get started</p>
        <Link href={paths.products} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">Shop Now</Link>
      </div>
    );
  }

  const handleQty = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    try { await updateItem({ productId, quantity }).unwrap(); }
    catch { toast.error("Failed to update quantity"); }
  };

  const handleRemove = async (productId: string) => {
    try { await removeItem(productId).unwrap(); toast.success("Item removed"); }
    catch { toast.error("Failed to remove item"); }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart <span className="text-gray-400 font-normal text-lg">({items.length} items)</span></h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.productId} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4">
              <div className="w-20 h-20 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
                {item.product.image
                  ? <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover"/>
                  : <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                }
              </div>
              <div className="flex-1 min-w-0">
                <Link href={paths.product(item.productId)}
                  className="font-semibold text-gray-900 text-sm hover:text-blue-600 line-clamp-2 block mb-1">
                  {item.product.name}
                </Link>
                <p className="text-blue-600 font-bold text-sm mb-3">₹{item.product.price.toLocaleString("en-IN")}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => handleQty(item.productId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold">−</button>
                    <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => handleQty(item.productId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold">+</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-900">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                    <button onClick={() => handleRemove(item.productId)}
                      className="text-red-400 hover:text-red-600 transition p-1">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link href={paths.products} className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium mt-2">
            ← Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 h-fit sticky top-24">
          <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm mb-4">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-medium">₹{subtotal.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium"}>
                {shipping === 0 ? "FREE" : `₹${SHIP_FEE}`}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-gray-400">Free shipping on orders above ₹{FREE_SHIP_THRESHOLD}</p>
            )}
            <div className="h-px bg-gray-100"/>
            <div className="flex justify-between font-bold text-gray-900 text-base">
              <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <Link href={paths.checkout}
            className="block w-full py-3 text-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
