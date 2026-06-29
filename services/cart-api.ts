import { baseAPI } from "./base-api";
import { CART } from "./tags";
import type { Cart } from "@root/types";

export const cartAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCart: builder.query<{ data: Cart }, void>({
      query: () => "/cart",
      providesTags: [CART],
    }),
    addToCart: builder.mutation<{ data: Cart }, { productId: string; quantity: number }>({
      query: (body) => ({ url: "/cart", method: "POST", body }),
      invalidatesTags: [CART],
    }),
    updateCartItem: builder.mutation<{ data: Cart }, { productId: string; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: `/cart/${productId}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: [CART],
    }),
    removeFromCart: builder.mutation<void, string>({
      query: (productId) => ({ url: `/cart/${productId}`, method: "DELETE" }),
      invalidatesTags: [CART],
    }),
    clearCart: builder.mutation<void, void>({
      query: () => ({ url: "/cart", method: "DELETE" }),
      invalidatesTags: [CART],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartAPI;
