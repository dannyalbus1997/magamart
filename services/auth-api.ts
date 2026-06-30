import { baseAPI } from "./base-api";
import { paths } from "@root/paths";

const { auth } = paths.api;

export const authAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (body) => ({ url: auth.login, method: "POST", body }),
    }),
    signup: builder.mutation<
      any,
      { firstName: string; lastName: string; email: string; password: string }
    >({
      query: (body) => ({ url: auth.signup, method: "POST", body }),
    }),
    authMe: builder.query<any, void>({
      query: () => auth.me,
    }),
    logout: builder.mutation<any, void>({
      query: () => ({ url: auth.logout, method: "POST" }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useAuthMeQuery,
  useLogoutMutation,
} = authAPI;
