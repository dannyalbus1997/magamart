import type { Draft } from "@reduxjs/toolkit";
import type { AuthState } from "./reducer";

export const loginSuccess = (state: Draft<AuthState>, action: any) => {
  const { data } = action.payload || {};
  state.isAuthenticated = !data?.requires2FA;
  state.accessToken = data?.access_token || data?.accessToken || null;
  state.refreshToken = data?.refresh_token || data?.refreshToken || null;
  state.requires2FA = data?.requires2FA || null;
  state.user = data?.user || data || {};
  state.currentView = data?.user?.role?.slug || null;
  if (state.accessToken) sessionStorage.setItem("accessToken", state.accessToken);
  if (state.refreshToken) sessionStorage.setItem("refreshToken", state.refreshToken);
};

export const authMeSuccess = (state: Draft<AuthState>, action: any) => {
  const user = action.payload?.data || action.payload || {};
  state.user = user;
  state.isAuthenticated = true;
  if (!state.currentView) state.currentView = user?.role?.slug || null;
};

export const logoutSuccess = (state: Draft<AuthState>) => {
  state.isAuthenticated = false;
  state.accessToken = null;
  state.refreshToken = null;
  state.requires2FA = null;
  state.user = {};
  state.currentView = null;
  ["accessToken", "refreshToken", "requires2FA"].forEach((k) => {
    sessionStorage.removeItem(k);
    localStorage.removeItem(k);
  });
};
