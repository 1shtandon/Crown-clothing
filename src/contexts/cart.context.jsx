import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {

    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // If found , increase the quantity by 1
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    // return modified array of cartItems
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToRemove) => {


    // If item's quantity is 1 then return all items except the item to be removed
    if (productToRemove.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    }

    // Here just decrease the quantity by 1

    return cartItems.map((cartItem) =>
        cartItem.id === productToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );

}

const clearCartItem = (cartItems, productToClear) => {
    // remove the item from cartItems
    return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);

}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
});

const INTIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}


const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {

        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }

        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }

        default:
            throw new Error(`Invalid action type ${type} in cartReducer`);
    }
}

export const CartProvider = ({ children }) => {

    const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INTIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        let newCartCount = 0;
        newCartItems.forEach((item) => {
            newCartCount += item.quantity;
        });

        let newCartTotal = 0;
        newCartItems.forEach((item) => {
            newCartTotal += item.quantity * item.price;
        });

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal
            })
        );
    };



    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (isOpen) => {
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen)
        )
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        removeItemFromCart,
        clearItemFromCart,
        cartTotal
    };
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}