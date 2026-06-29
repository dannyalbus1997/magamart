"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AdminGuard } from "@root/guards";
import { useCreateProductMutation, useGetCategoryNamesQuery } from "@services/products-api";
import { paths } from "@root/paths";
import toast from "react-hot-toast";

const schema = yup.object({
  name: yup.string().trim().required("Product name is required"),
  description: yup.string().trim().default(""),
  price: yup
    .number()
    .typeError("Enter a valid price")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  category: yup.string().required("Category is required"),
  stock: yup
    .number()
    .typeError("Enter a valid stock amount")
    .min(0, "Stock cannot be negative")
    .integer("Stock must be a whole number")
    .required("Stock is required"),
});

type FormValues = yup.InferType<typeof schema>;

export default function NewProductPage() {
  const router = useRouter();
  const [create, { isLoading }] = useCreateProductMutation();
  const { data: categoryData } = useGetCategoryNamesQuery();
  const categories = categoryData?.data ?? [];

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (values: FormValues) => {
    const fd = new FormData();
    fd.append("name", values.name);
    fd.append("description", values.description ?? "");
    fd.append("price", String(values.price));
    fd.append("category", values.category);
    fd.append("stock", String(values.stock));
    if (imageFile) fd.append("image", imageFile);

    try {
      await create(fd).unwrap();
      toast.success("Product created!");
      router.push(paths.admin.products);
    } catch (err: unknown) {
      toast.error((err as { data?: { message?: string } })?.data?.message || "Failed to create product");
    }
  };

  const inputCls = (hasError: boolean) =>
    `w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition ${
      hasError ? "border-red-400 bg-red-50 focus:ring-red-400" : "border-gray-200 focus:ring-blue-500"
    }`;

  return (
    <AdminGuard>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href={paths.admin.products} className="text-gray-400 hover:text-gray-600 text-xl">
            ←
          </Link>
          <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Name *</label>
            <input {...register("name")} placeholder="e.g. Samsung Galaxy S22" className={inputCls(!!errors.name)} />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label>
            <textarea
              {...register("description")}
              rows={3}
              placeholder="Product description…"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Price (₹) *</label>
              <input type="number" min="0" step="any" {...register("price")} placeholder="0" className={inputCls(!!errors.price)} />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Stock *</label>
              <input type="number" min="0" {...register("stock")} placeholder="0" className={inputCls(!!errors.stock)} />
              {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock.message}</p>}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category *</label>
            <select {...register("category")} className={inputCls(!!errors.category)}>
              <option value="">Select category…</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Product Image <span className="text-gray-400 font-normal">(jpg, png, webp — max 5 MB)</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
              className="hidden"
              id="product-image"
            />
            {!imagePreview ? (
              <label
                htmlFor="product-image"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
              >
                <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-400">Click to upload image</span>
              </label>
            ) : (
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group">
                <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  <span className="text-white text-xs font-semibold">Remove</span>
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Link
              href={paths.admin.products}
              className="flex-1 py-2.5 text-center rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-60 transition"
            >
              {isLoading ? "Creating…" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </AdminGuard>
  );
}
