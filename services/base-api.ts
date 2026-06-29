import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { config } from "@root/config";
import { TAGS } from "./tags";
import type { RootState } from "@root/store";
import { paths } from "@root/paths";
import toast from "react-hot-toast";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: config.API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const internalBaseQuery = fetchBaseQuery({ baseUrl: "/" });

/** Mutex-style flag so parallel 401s don't each trigger a refresh */
let isRefreshing = false;

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  async (args, api, extraOptions) => {
    const url = typeof args === "string" ? args : args.url;

    // Internal Next.js API routes skip the reauth logic
    if (url?.startsWith("/api/")) {
      return internalBaseQuery(args, api, extraOptions);
    }

    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401 && !isRefreshing) {
      const errorMessage = (result.error.data as any)?.message ?? "";

      // Session invalidated on another device — logout immediately
      if (errorMessage.toLowerCase().includes("session has been invalidated")) {
        toast.error("Your session was ended because you logged in from another device or browser.");
        api.dispatch({ type: "auth/logout" });
        return result;
      }

      // Try to refresh the access token
      const refreshToken = (api.getState() as RootState).auth.refreshToken;
      if (refreshToken) {
        isRefreshing = true;
        try {
          const refreshResult = await rawBaseQuery(
            {
              url: paths.api.auth.refresh,
              method: "POST",
              headers: { Authorization: `Bearer ${refreshToken}` },
            },
            api,
            extraOptions,
          );

          if (refreshResult.data) {
            const payload = refreshResult.data as any;
            const newAccessToken =
              payload?.data?.accessToken ?? payload?.accessToken ?? null;
            const newRefreshToken =
              payload?.data?.refreshToken ?? payload?.refreshToken ?? null;

            if (newAccessToken) {
              api.dispatch({
                type: "auth/setTokens",
                payload: { accessToken: newAccessToken, refreshToken: newRefreshToken },
              });

              // Retry the original request with the new token
              result = await rawBaseQuery(args, api, extraOptions);
            } else {
              // Refresh returned no token — force logout
              toast.error("Session expired. Please sign in again.");
              api.dispatch({ type: "auth/logout" });
            }
          } else {
            toast.error("Session expired. Please sign in again.");
            api.dispatch({ type: "auth/logout" });
          }
        } finally {
          isRefreshing = false;
        }
      } else {
        // No refresh token at all — user needs to log in
        api.dispatch({ type: "auth/logout" });
      }
    }

    return result;
  };

export const baseAPI = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: TAGS,
  endpoints: () => ({}),
});
