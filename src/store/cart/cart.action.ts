
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";

// Utility Functions
const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
  // find if cartitems contains producttoAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
    );
    // increments 
    if(existingCartItem) {
      return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
      {...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
      );
    }
  // return new array with modified cartItems/ new cart item
  return [...cartItems, {...productToAdd, quantity: 1 }];
}; 

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
    );
    // check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem && existingCartItem.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? 
      {...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
      );

};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

// Cart Actions

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

// Action Creators
export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems =>  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

//
export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
const newCartItems = (addCartItem(cartItems, productToAdd));
return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
const newCartItems = (removeCartItem(cartItems, cartItemToRemove));
return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
const newCartItems = (clearCartItem(cartItems, cartItemToClear));
return setCartItems(newCartItems);
};