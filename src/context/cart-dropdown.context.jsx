//
import { createContext, useState, useEffect, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const reduceCartItem = (cartItems, productToRemove) => {
  //check to see if item exists
  const existingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  //if item exists, reduce the q
  if (existingCartItem) {
    if (existingCartItem.quantity === 1) {
      return cartItems.filter((item) => item.id !== productToRemove.id);
    }
    return cartItems.map((item) =>
      item.id === productToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
  return cartItems;
};

const clearCartItem = (cartItems, productToRemove) => {
  //check to see if item exists
  const existingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );
  //if item exists, reduce the q
  if (existingCartItem) {
      return cartItems.filter((item) => item.id !== productToRemove.id);
  }
  return cartItems;
};

const INITIAL_STATE ={
  cartItems: [],
  isCartOpen: true,
  cartItemCount: 0,
  cartItemPrice: 0,
}

export const CATEGORY_ACTION_TYPES = {
  SET_CARD_ITEMS: 'SET_CARD_ITEMS',
  TOGGLE_CART : 'TOGGLE_CART'
}
const cartReducer = (state, action) => {
  const {type, payload} = action;

  switch (type) {
    case CATEGORY_ACTION_TYPES.SET_CARD_ITEMS:
      return {
        ...state,
        ...payload,
      }
    case CATEGORY_ACTION_TYPES.TOGGLE_CART:
      return {
        ...state,
        isCartOpen: payload
      }
      default:
        throw new Error("e")
  }
}

//this is used for the general react app.
//everyone using this context will get this as its default state.
export const CartContext = createContext({
  cartItems: [],
  //isCartOpen: false,
  toggleCart: () => {},
  addItemToCart: () => {},
  cartItemCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartItemPrice: 0,
});

export const CartProvider = ({ children }) => {
  

  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const {cartItems, isCartOpen, cartItemCount, cartItemPrice } = state;

 const updateCartItemsReducer = (updatedCartItems) => {  

     const updatedCartCount = updatedCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
     const updatedCartTotalPrice = updatedCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch({type: CATEGORY_ACTION_TYPES.SET_CARD_ITEMS, payload: {cartItems: updatedCartItems, cartItemPrice: updatedCartTotalPrice, cartItemCount: updatedCartCount}});

  } 



  const addItemToCart = (productToAdd) => {
   const updatedCartItems = addCartItem(cartItems, productToAdd)
   updateCartItemsReducer(updatedCartItems)
  };

  const removeItemFromCart = (productToRemove) => {
    const updatedCartItems = reduceCartItem(cartItems, productToRemove)
    updateCartItemsReducer(updatedCartItems)
  };
  const clearItemFromCart = (productToRemove) => {
    const updatedCartItems = clearCartItem(cartItems, productToRemove)
    updateCartItemsReducer(updatedCartItems)
  };

  const toggleCart = (bool) => {
      dispatch({type: CATEGORY_ACTION_TYPES.TOGGLE_CART, payload: bool})
  }

  const value = {
    isCartOpen,  
    toggleCart,
    cartItems,
    addItemToCart,
    cartItemCount,
    removeItemFromCart,
    cartItemPrice,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
