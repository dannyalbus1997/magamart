import { baseAPI } from "./base-api";
import { ORDERS, CART } from "./tags";
import type { Order, PaginatedResponse, ShippingAddress } from "@root/types";
import { paths } from "@root/paths";

const { orders } = paths.api;

export const ordersAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMyOrders: builder.query<PaginatedResponse<Order>, void>({
      query: () => orders.my,
      providesTags: [ORDERS],
    }),
    getOrder: builder.query<{ data: Order }, string>({
      query: (id) => orders.byId(id),
      providesTags: [ORDERS],
    }),
    createOrder: builder.mutation<{ data: Order }, { shippingAddress: ShippingAddress; paymentIntent: string }>({
      query: (body) => ({ url: orders.root, method: "POST", body }),
      invalidatesTags: [ORDERS, CART],
    }),
    getAllOrders: builder.query<PaginatedResponse<Order>, { page?: number; limit?: number; status?: string }>({
      query: (params) => ({ url: orders.root, params }),
      providesTags: [ORDERS],
    }),
    updateOrderStatus: builder.mutation<{ data: Order }, { id: string; status: string }>({
      query: ({ id, status }) => ({ url: orders.status(id), method: "PUT", body: { status } }),
      invalidatesTags: [ORDERS],
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = ordersAPI;
