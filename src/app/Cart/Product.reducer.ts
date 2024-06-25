import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './Product.actions';
import { cartProduct } from '../Model/Product'; // Adjust path and import as per your project structure

// Define a key for storing cart items in localStorage
const localStorageKey = 'cartItems';

// Retrieve cart items from localStorage or initialize an empty array
const storedCartItems: cartProduct[] = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(localStorageKey) || '[]') : [];



export interface CartState {
  cartItems: cartProduct[];
}

const initialState: CartState = {
  cartItems: storedCartItems
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.addItem, (state, { product, user_id }) => {
    console.log("hello")
    const existingItem = state.cartItems.find(
      item => item.product._id === product._id && item.user_id === user_id
    );

    if (existingItem) {
      if (existingItem.quantity < 5) {
        const updatedCartItems = state.cartItems.map(item =>
          item.product._id === product._id && item.user_id === user_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem(localStorageKey, JSON.stringify(updatedCartItems)); // Update localStorage
        return {
          ...state,
          cartItems: updatedCartItems
        };
      }
      // Maximum quantity reached, do nothing
      return { ...state };
    } else {
      const updatedCartItems = [...state.cartItems, { product, user_id, quantity: 1 }];
      localStorage.setItem(localStorageKey, JSON.stringify(updatedCartItems)); // Update localStorage
      return {
        ...state,
        cartItems: updatedCartItems
      };
    }
  }),
  on(ProductActions.removeItem, (state, { productId }) => {
    const updatedCartItems = state.cartItems.filter(item => item.product._id !== productId);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedCartItems)); // Update localStorage
    return {
      ...state,
      cartItems: updatedCartItems
    };
  }),
  on(ProductActions.incrementQuantity, (state, { productId }) => {
    const updatedCartItems = state.cartItems.map(item =>
      item.product._id === productId && item.quantity < 5
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    localStorage.setItem(localStorageKey, JSON.stringify(updatedCartItems)); // Update localStorage
    return {
      ...state,
      cartItems: updatedCartItems
    };
  }),
  on(ProductActions.decrementQuantity, (state, { productId }) => {
    const storedCartItems: cartProduct[] = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(localStorageKey) || '[]') : [];
    console.log(storedCartItems)
    const updatedCartItems = storedCartItems.map(item =>
      item.product._id === productId && item.quantity
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0); // Remove items with zero quantity
    localStorage.setItem(localStorageKey, JSON.stringify(updatedCartItems)); // Update localStorage
    return {
      ...state,
      cartItems: updatedCartItems
    };
  })
);

