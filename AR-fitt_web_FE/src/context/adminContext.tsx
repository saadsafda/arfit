import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AdminUser, AdminProduct, AdminCategory } from '../services/admin.service';

// State interface
interface AdminState {
  users: AdminUser[];
  products: AdminProduct[];
  categories: AdminCategory[];
  loading: boolean;
  error: string | null;
  selectedUser: AdminUser | null;
  selectedProduct: AdminProduct | null;
  selectedCategory: AdminCategory | null;
}

// Action types
type AdminAction =
  | { type: 'SET_USERS'; payload: AdminUser[] }
  | { type: 'SET_PRODUCTS'; payload: AdminProduct[] }
  | { type: 'SET_CATEGORIES'; payload: AdminCategory[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SELECTED_USER'; payload: AdminUser | null }
  | { type: 'SET_SELECTED_PRODUCT'; payload: AdminProduct | null }
  | { type: 'SET_SELECTED_CATEGORY'; payload: AdminCategory | null }
  | { type: 'ADD_USER'; payload: AdminUser }
  | { type: 'UPDATE_USER'; payload: AdminUser }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'ADD_PRODUCT'; payload: AdminProduct }
  | { type: 'UPDATE_PRODUCT'; payload: AdminProduct }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: AdminCategory }
  | { type: 'UPDATE_CATEGORY'; payload: AdminCategory }
  | { type: 'DELETE_CATEGORY'; payload: string };

// Initial state
const initialState: AdminState = {
  users: [],
  products: [],
  categories: [],
  loading: false,
  error: null,
  selectedUser: null,
  selectedProduct: null,
  selectedCategory: null,
};

// Reducer function
function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SELECTED_USER':
      return { ...state, selectedUser: action.payload };
    case 'SET_SELECTED_PRODUCT':
      return { ...state, selectedProduct: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.id ? action.payload : category
        ),
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload),
      };
    default:
      return state;
  }
}

// Context interface
interface AdminContextType {
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
}

// Create context
const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Provider component
interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use admin context
export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
