import { baseAPI } from "./base-api";

export const authAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    authMe: builder.query<any, void>({
      query: () => "/auth/me",
    }),
    logout: builder.mutation<any, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
    }),
  }),
});

export const { useLoginMutation, useAuthMeQuery, useLogoutMutation } = authAPI;
