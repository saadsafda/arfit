import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, CLEAR_CART } from "./cartActionTypes";

export const addToCart = (item: any) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId: string) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const updateQuantity = (itemId: string, quantity: number) => ({
  type: UPDATE_CART_QUANTITY,
  payload: { itemId, quantity },
});

export const clearCart = () => ({
  type: CLEAR_CART,
}); 