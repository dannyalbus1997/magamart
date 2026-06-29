import { baseAPI } from "./base-api";
import { PRODUCTS, CATEGORIES } from "./tags";
import type { Product, PaginatedResponse } from "@root/types";
import { paths } from "@root/paths";

const { products } = paths.api;
const { categories } = paths.api;

export const productsAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedResponse<Product>, {
      page?: number; limit?: number; search?: string;
      category?: string; minPrice?: number; maxPrice?: number;
      sortBy?: string; sortOrder?: "asc" | "desc";
    }>({
      query: (params) => ({ url: products.root, params }),
      providesTags: [PRODUCTS],
    }),
    getProduct: builder.query<{ data: Product }, string>({
      query: (id) => products.byId(id),
      providesTags: [PRODUCTS],
    }),
    /** Distinct category names from products collection */
    getCategories: builder.query<{ data: string[] }, void>({
      query: () => products.categories,
      providesTags: [PRODUCTS],
    }),
    /** Category names from the categories collection (for admin dropdowns) */
    getCategoryNames: builder.query<{ data: string[] }, void>({
      query: () => categories.names,
      providesTags: [CATEGORIES],
    }),
    createProduct: builder.mutation<{ data: Product }, FormData>({
      query: (formData) => ({ url: products.root, method: "POST", body: formData }),
      invalidatesTags: [PRODUCTS],
    }),
    updateProduct: builder.mutation<{ data: Product }, { id: string; body: FormData }>({
      query: ({ id, body }) => ({ url: products.byId(id), method: "PUT", body }),
      invalidatesTags: [PRODUCTS],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({ url: products.byId(id), method: "DELETE" }),
      invalidatesTags: [PRODUCTS],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useGetCategoryNamesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsAPI;
