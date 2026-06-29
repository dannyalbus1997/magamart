import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { config } from "@root/config";
import { TAGS } from "./tags";
import type { RootState } from "@root/store";
import toast from "react-hot-toast";

const baseQuery = fetchBaseQuery({
  baseUrl: config.API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});
const internalBaseQuery = fetchBaseQuery({ baseUrl: "/" });

const baseQueryWithSessionCheck: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  async (args, api, extraOptions) => {
    const url = typeof args === "string" ? args : args.url;
    const result = url?.startsWith("/api/")
      ? await internalBaseQuery(args, api, extraOptions)
      : await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      const errorMessage = (result.error.data as any)?.message ?? "";
      if (errorMessage.toLowerCase().includes("session has been invalidated")) {
        toast.error("Your session was ended because you logged in from another device or browser.");
        api.dispatch({ type: "auth/logout" });
      }
    }
    return result;
  };

export const baseAPI = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithSessionCheck,
  tagTypes: TAGS,
  endpoints: () => ({}),
});
