import { CategoryItem } from "../categories/categories.types"

export enum CART_ACTION_TYPES {
  UPDATE_CART_ITEMS = "cart/UPDATE_CART_ITEMS",
  SET_VISIBILITY = "cart/SET_VISIBILITY"
}

export type CartItem = CategoryItem & { quantity: number }