"use client";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { baseAPI } from "@services/base-api";
import { combineReducers } from "redux";
import type { AnyAction } from "@reduxjs/toolkit";
import settingsReducer from "./settings-slice";
import { clearLocalStorage, getLocalStorage, setLocalStorage } from "@root/utils";
import { configureStore, type ThunkAction } from "@reduxjs/toolkit";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { authReducer } from "@root/slices/auth/reducer";

const createNoopStorage = () => ({
  getItem(): Promise<null> { return Promise.resolve(null); },
  setItem(): Promise<void> { return Promise.resolve(undefined); },
  removeItem(): Promise<void> { return Promise.resolve(undefined); },
});
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = { key: "root", version: 1, whitelist: ["auth"], storage };

const appReducer = combineReducers({
  [baseAPI.reducerPath]: baseAPI.reducer,
  auth: authReducer,
  settings: settingsReducer,
});
const rootReducer = (state: any, action: any): any => {
  if (action.type === "auth/logout") {
    state = undefined;
    const rememberMeData = getLocalStorage("rememberMe");
    clearLocalStorage();
    if (rememberMeData) setLocalStorage("rememberMe", rememberMeData);
  }
  return appReducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(baseAPI.middleware),
});
export const Persistor = persistStore(Store);
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = (): any => useReduxDispatch<AppDispatch>();
