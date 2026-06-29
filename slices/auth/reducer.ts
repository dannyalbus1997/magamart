import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { removeSessionStorage } from "@root/utils";
import { removeAuthToken } from "@root/utils/local-storage";
import { authAPI } from "@services/auth-api";
import { authMeSuccess, loginSuccess, logoutSuccess } from "./extra-reducers";

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  requires2FA: boolean | null;
  user: Record<string, any>;
  currentView: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false, accessToken: null, refreshToken: null,
  requires2FA: null, user: {}, currentView: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentView: (state: AuthState, action: PayloadAction<string>) => { state.currentView = action.payload; },
    setTokens: (state: AuthState, action: PayloadAction<{ accessToken: string; refreshToken?: string | null }>) => {
      state.accessToken = action.payload.accessToken;
      if (action.payload.refreshToken !== undefined) state.refreshToken = action.payload.refreshToken;
      sessionStorage.setItem("accessToken", action.payload.accessToken);
      if (action.payload.refreshToken) sessionStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    logout: (state: AuthState) => {
      state.isAuthenticated = initialState.isAuthenticated;
      state.user = initialState.user;
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      state.requires2FA = initialState.requires2FA;
      state.currentView = initialState.currentView;
      ["accessToken","refreshToken","requires2FA"].forEach((k) => { removeSessionStorage(k); removeAuthToken(k); });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authAPI.endpoints.login.matchFulfilled, loginSuccess);
    builder.addMatcher(authAPI.endpoints.authMe.matchFulfilled, authMeSuccess);
    builder.addMatcher(authAPI.endpoints.logout.matchFulfilled, logoutSuccess);
    builder.addMatcher(authAPI.endpoints.logout.matchRejected, logoutSuccess);
  },
});

export const authActions = slice.actions;
// named export so base-api.ts can reference the action type string reliably
export const { setTokens } = slice.actions;
export const authReducer = slice.reducer;
