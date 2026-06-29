import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@root/types";
import type { RootState } from "@root/store";

interface LocalCartItem {
  productId: string;
  product: Product;
  quantity: number;
}

interface LocalCartState {
  items: LocalCartItem[];
}

const initialState: LocalCartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ product: Product; quantity: number }>) {
      const { product, quantity } = action.payload;
      const existing = state.items.find((i) => i.productId === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ productId: product.id, product, quantity });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const item = state.items.find((i) => i.productId === action.payload.productId);
      if (item) item.quantity = action.payload.quantity;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const selectLocalCart = (state: RootState) => (state as any).cart as LocalCartState;
export const selectLocalCartItems = (state: RootState) => (state as any).cart.items as LocalCartItem[];
export const selectLocalCartCount = (state: RootState) =>
  ((state as any).cart.items as LocalCartItem[]).reduce((sum: number, i: LocalCartItem) => sum + i.quantity, 0);
export const selectLocalCartTotal = (state: RootState) =>
  ((state as any).cart.items as LocalCartItem[]).reduce(
    (sum: number, i: LocalCartItem) => sum + i.product.price * i.quantity, 0
  );
