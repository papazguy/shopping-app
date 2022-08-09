export const CATEGORY_ACTION_TYPES = {
    SET_CARD_ITEMS: 'SET_CARD_ITEMS',
    TOGGLE_CART : 'TOGGLE_CART'
  }

  const INITIAL_STATE ={
    cartItems: [],
    isCartOpen: false,
    cartItemCount: 0,
    cartItemPrice: 0,
  }

  const cartReducer = (state = INITIAL_STATE, action) => {
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
          throw state;
    }
  }