import { createSelector } from 'reselect';

//get the slice
const selecCartReducer = state => state.cart;

export const selectCartItems = createSelector(
    [selecCartReducer],
    (updatedCart) => updatedCart.cartItems
)

export const selectIsCartOpen = createSelector(
    [selecCartReducer],
    (updatedCart) => updatedCart.isCartOpen
)

export const selectCartCount = createSelector(
    [selectCartItems],
    (updatedCartItems) => updatedCartItems.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      )
)

export const selectCartPrice = createSelector(
    [selectCartItems],
    (updatedCartItems) => updatedCartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
      )
)

