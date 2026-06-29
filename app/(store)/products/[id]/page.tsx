"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useGetProductQuery, useGetProductsQuery } from "@services/products-api";
import { useAddToCartMutation } from "@services/cart-api";
import { useSelector } from "@store/index";
import { selectAuthUser } from "@slices/auth";
import toast from "react-hot-toast";
import { paths } from "@root/paths";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const user = useSelector(selectAuthUser) as any;
  const { data, isLoading, isError } = useGetProductQuery(id);
  const product = data?.data;

  const { data: relatedData } = useGetProductsQuery(
    { category: product?.category, limit: 4 },
    { skip: !product?.category }
  );
  const related = (relatedData?.data || []).filter(p => p.id !== id).slice(0, 4);

  const [addToCart, { isLoading: adding }] = useAddToCartMutation();
  const [qty, setQty] = useState(1);

  const handleAdd = async () => {
    if (!user || Object.keys(user).length === 0) {
      toast.error("Please sign in to add items to cart");
      return;
    }
    try {
      await addToCart({ productId: id, quantity: qty }).unwrap();
      toast.success("Added to cart!");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-48 mb-6"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-96 bg-gray-200 rounded-2xl"/>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"/>
            <div className="h-6 bg-gray-200 rounded w-1/4"/>
            <div className="h-20 bg-gray-200 rounded w-full"/>
            <div className="h-12 bg-gray-200 rounded w-full"/>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
        <Link href={paths.products} className="mt-4 inline-block px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href={paths.home} className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href={paths.products} className="hover:text-blue-600">Products</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden aspect-square flex items-center justify-center">
          {product.image
            ? <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
            : <div className="text-8xl">📦</div>
          }
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full w-fit mb-3">{product.category}</span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
          <p className="text-3xl font-extrabold text-blue-600 mb-4">₹{product.price.toLocaleString("en-IN")}</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}/>
            <span className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
              {product.stock > 0 ? `In Stock — ${product.stock} available` : "Out of Stock"}
            </span>
          </div>

          {product.stock > 0 && (
            <>
              {/* Qty */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold text-lg">−</button>
                  <span className="w-12 text-center text-sm font-semibold">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold text-lg">+</button>
                </div>
              </div>

              {/* Add to cart */}
              <div className="flex gap-3">
                <button onClick={handleAdd} disabled={adding}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition disabled:opacity-60 disabled:cursor-not-allowed">
                  {adding ? "Adding…" : "Add to Cart"}
                </button>
                <Link href={paths.cart}
                  className="px-5 py-3 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-sm transition text-center">
                  View Cart
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-5">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(rp => (
              <Link key={rp.id} href={paths.product(rp.id)}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition group">
                <div className="h-40 bg-gray-100">
                  {rp.image
                    ? <img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    : <div className="w-full h-full flex items-center justify-center text-3xl">📦</div>
                  }
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">{rp.name}</p>
                  <p className="text-blue-600 font-bold text-sm">₹{rp.price.toLocaleString("en-IN")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
