import { baseAPI } from "./base-api";
import { ANALYTICS } from "./tags";
import type { AnalyticsSummary } from "@root/types";

export const analyticsAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAnalytics: builder.query<{ data: AnalyticsSummary }, void>({
      query: () => "/admin/analytics",
      providesTags: [ANALYTICS],
    }),
  }),
});

export const { useGetAnalyticsQuery } = analyticsAPI;
