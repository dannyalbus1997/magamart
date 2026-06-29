"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminGuard } from "@root/guards";
import { useGetProductQuery, useUpdateProductMutation } from "@services/products-api";
import toast from "react-hot-toast";

const CATEGORIES = ["Electronics","Fashion","Furniture","Cosmetics","Watches","Accessories","Daily Essentials","Smartphones","Home & Kitchen","Sports","Beauty","Groceries"];

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading: fetching, isError } = useGetProductQuery(id);
  const [update, { isLoading }] = useUpdateProductMutation();
  const [form, setForm] = useState({ name:"", description:"", price:"", category:"", stock:"", image:"" });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (data?.data) {
      const p = data.data;
      setForm({ name:p.name, description:p.description||"", price:String(p.price), category:p.category, stock:String(p.stock), image:p.image||"" });
      setPreview(p.image||"");
    }
  }, [data]);

  const set = (k: string, v: string) => { setForm(f=>({...f,[k]:v})); if(errors[k]) setErrors(e=>({...e,[k]:""})); };

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price)<=0) e.price = "Enter a valid price";
    if (!form.category) e.category = "Required";
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock)<0) e.stock = "Enter valid stock";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await update({ id, body: { name:form.name, description:form.description, price:Number(form.price), category:form.category, stock:Number(form.stock), image:form.image } }).unwrap();
      toast.success("Product updated!");
      router.push("/admin/products");
    } catch (err: unknown) {
      toast.error((err as {data?:{message?:string}})?.data?.message || "Failed to update product");
    }
  };

  const inputCls = (k: string) => `w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition ${errors[k] ? "border-red-400 bg-red-50 focus:ring-red-400" : "border-gray-200 focus:ring-blue-500"}`;

  if (fetching) return (
    <AdminGuard>
      <div className="max-w-2xl animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-48"/>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          {Array.from({length:5}).map((_,i)=><div key={i} className="h-10 bg-gray-200 rounded-xl"/>)}
        </div>
      </div>
    </AdminGuard>
  );

  if (isError) return (
    <AdminGuard>
      <div className="text-center py-20">
        <p className="text-red-500 font-semibold mb-3">Product not found</p>
        <Link href="/admin/products" className="text-blue-600 hover:underline text-sm">← Back to Products</Link>
      </div>
    </AdminGuard>
  );

  return (
    <AdminGuard>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/products" className="text-gray-400 hover:text-gray-600 text-xl">←</Link>
          <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Name *</label>
            <input value={form.name} onChange={e=>set("name",e.target.value)} className={inputCls("name")}/>
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label>
            <textarea value={form.description} onChange={e=>set("description",e.target.value)} rows={3} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Price (₹) *</label>
              <input type="number" min="0" value={form.price} onChange={e=>set("price",e.target.value)} className={inputCls("price")}/>
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Stock *</label>
              <input type="number" min="0" value={form.stock} onChange={e=>set("stock",e.target.value)} className={inputCls("stock")}/>
              {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock}</p>}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category *</label>
            <select value={form.category} onChange={e=>set("category",e.target.value)} className={inputCls("category")}>
              <option value="">Select category…</option>
              {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Image URL</label>
            <input value={form.image} onChange={e=>{set("image",e.target.value);setPreview(e.target.value);}} placeholder="https://…" className={inputCls("image")}/>
            {preview && (
              <div className="mt-2 w-24 h-24 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img src={preview} alt="preview" className="w-full h-full object-cover" onError={()=>setPreview("")}/>
              </div>
            )}
          </div>
          <div className="flex gap-3 pt-2">
            <Link href="/admin/products" className="flex-1 py-2.5 text-center rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</Link>
            <button type="submit" disabled={isLoading}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-60 transition">
              {isLoading ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </AdminGuard>
  );
}
