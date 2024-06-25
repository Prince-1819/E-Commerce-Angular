// product.actions.ts

import { createAction, props } from '@ngrx/store';
import { Product } from '../Model/Product'; // Adjust path as per your structure

export const addItem = createAction('[Cart] Add Item', props<{ product: Product, user_id: string | null }>());
export const removeItem = createAction('[Cart] Remove Item', props<{ productId: string }>());
export const incrementQuantity = createAction('[Cart] Increment Quantity', props<{ productId: string }>());
export const decrementQuantity = createAction('[Cart] Decrement Quantity', props<{ productId: string }>());
