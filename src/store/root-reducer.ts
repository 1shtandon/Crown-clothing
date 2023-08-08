import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer } from "redux-persist";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer, CategoriesState } from "./categories/categories.reducer";
import { cartReducer, CartState } from "./cart/cart.reducer";
import { RootState } from "./store";

const rootPersistConfig: PersistConfig<RootState> & { blacklist: (keyof RootState)[] } = {
    key: "root",
    storage,
    blacklist: ["user", "cart", "categories"],
};

const cartPersistConfig: PersistConfig<CartState> & { blacklist: (keyof CartState)[] } = {
    key: "cart",
    storage,
    blacklist: ["toggled"],
}

const categoriesPersistConfig: PersistConfig<CategoriesState> & { blacklist: (keyof CategoriesState)[] } = {
    key: "categories",
    storage,
    blacklist: ["isLoading", "error"]
}

export const rootReducer = combineReducers({
    user: userReducer,
    categories: persistReducer(categoriesPersistConfig, categoriesReducer),
    cart: persistReducer(cartPersistConfig, cartReducer),
})

export const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);
