import { baseAPI } from "./base-api";
import { PRODUCTS } from "./tags";
import type { Product, PaginatedResponse } from "@root/types";

export const productsAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedResponse<Product>, {
      page?: number; limit?: number; search?: string;
      category?: string; minPrice?: number; maxPrice?: number;
      sortBy?: string; sortOrder?: "asc" | "desc";
    }>({
      query: (params) => ({ url: "/products", params }),
      providesTags: [PRODUCTS],
    }),
    getProduct: builder.query<{ data: Product }, string>({
      query: (id) => `/products/${id}`,
      providesTags: [PRODUCTS],
    }),
    getCategories: builder.query<{ data: string[] }, void>({
      query: () => "/products/categories",
      providesTags: [PRODUCTS],
    }),
    createProduct: builder.mutation<{ data: Product }, Partial<Product>>({
      query: (body) => ({ url: "/products", method: "POST", body }),
      invalidatesTags: [PRODUCTS],
    }),
    updateProduct: builder.mutation<{ data: Product }, { id: string; body: Partial<Product> }>({
      query: ({ id, body }) => ({ url: `/products/${id}`, method: "PUT", body }),
      invalidatesTags: [PRODUCTS],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: [PRODUCTS],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsAPI;
