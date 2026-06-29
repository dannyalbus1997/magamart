import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface SettingsState { hideLayout: boolean; }
const initialState: SettingsState = { hideLayout: false };
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: { setHideLayout: (state, action: PayloadAction<boolean>) => { state.hideLayout = action.payload; } },
});
export const { setHideLayout } = settingsSlice.actions;
export default settingsSlice.reducer;
