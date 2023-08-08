import { PayloadAction } from "@reduxjs/toolkit";

import { CartItem } from "./cart.types";
import { CategoryItem } from "../categories/categories.types";
import { updateCart } from "./cart.reducer";

export type SetToggle = PayloadAction<boolean>
export type UpdateCart = PayloadAction<CartItem[]>

export const addItemCart = (cartItems: CartItem[], product: CategoryItem): CartItem[] => {
  const item = cartItems.find((item) => item.id === product.id);

  if (item) item.quantity++;
  else cartItems.push({ ...product, quantity: 1 });

  return [...cartItems];
};

export const removeItemCart = (cartItems: CartItem[], product: CategoryItem): CartItem[] => {
  const item = cartItems.find((item) => item.id === product.id);

  if (item) {
    item.quantity--;
    
    const ind = cartItems.indexOf(item);
    if (item.quantity === 0) cartItems.splice(ind, 1);
  }

  return [...cartItems];
};

export const clearProduct = (cartItems: CartItem[], product: CategoryItem): CartItem[] => {
  const item = cartItems.find((item) => item.id === product.id);

  if (item)
    return [...cartItems.filter((cartItem) => cartItem.id !== product.id)];
  return [...cartItems];
};

export const addItemToCart = (cartItems: CartItem[], product: CategoryItem): UpdateCart => {
  const newCartItems = addItemCart(cartItems, product);
  return updateCart(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], product: CategoryItem): UpdateCart => {
  const newCartItems = removeItemCart(cartItems, product);
  return updateCart(newCartItems);
};

export const removeProduct = (cartItems: CartItem[], product: CategoryItem): UpdateCart => {
  const newCartItems = clearProduct(cartItems, product);
  return updateCart(newCartItems);
};
