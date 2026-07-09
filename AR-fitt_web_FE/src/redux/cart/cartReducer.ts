import { AnyAction } from "redux";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
} from "./cartActionTypes";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  [key: string]: any;
}

export interface CartState {
  items: CartItem[];
}

interface CartAction {
  type: string;
  payload?: any;
}

const initialState: CartState = {
  items: [],
};

const cartReducer = (state: CartState = initialState, action: AnyAction): CartState => {
  switch (action.type) {
    case ADD_TO_CART: {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...item, quantity: item.quantity || 1 }],
        };
      }
    }
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.itemId ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default cartReducer; 