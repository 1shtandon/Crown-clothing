import { createSlice } from "@reduxjs/toolkit";

import { CartItem } from "./cart.types";
import { SetToggle, UpdateCart } from "./cart.action";

export type CartState = {
  readonly toggled: boolean
  readonly cartItems: CartItem[]
}

const CART_INITIAL_STATE: CartState = {
  toggled: false,
  cartItems: [] as CartItem[],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: CART_INITIAL_STATE,
  reducers: {
    setToggle: (state, action: SetToggle) => {
      state.toggled = action.payload;
    },
    updateCart: (state, action: UpdateCart) => {
      state.cartItems = action.payload;
    }
  }
});

export const { setToggle, updateCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
