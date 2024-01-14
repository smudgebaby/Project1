import { CART_ACTION_TYPES } from './cartTypes.js';
import {createAction} from '../../Utils/reducerUtil.js';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === productToAdd._id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === productToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const updateCartItem = (cartItems, productToUpdate, quantity) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === productToUpdate._id
  );

  if (quantity === 0) {
    return cartItems.filter((cartItem) => cartItem._id !== productToUpdate._id);
  }

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === productToUpdate._id
        ? { ...cartItem, quantity: quantity }
        : cartItem
    );
  }

  return [...cartItems, { ...productToUpdate, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToRemove._id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem._id !== cartItemToRemove._id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem._id === cartItemToRemove._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem._id !== cartItemToClear._id99);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const updateItemToCart = (cartItems, productToUpdate, quantity) => {

  const newCartItems = updateCartItem(cartItems, productToUpdate, quantity);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const setCartDiscount = (discount) =>
  createAction(CART_ACTION_TYPES.SET_CART_DISCOUNT, discount);