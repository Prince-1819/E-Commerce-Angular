import { Component, OnInit } from '@angular/core';
import { cartProduct } from '../Model/Product';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Store } from '@ngrx/store';
import { decrementQuantity, incrementQuantity } from '../Cart/Product.actions';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [NgFor,NgForOf,CommonModule,FormsModule,RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})


export class CartPageComponent implements OnInit {
  cartItems: cartProduct[] = [];

  constructor(private store: Store) {

  }
  ngOnInit(): void {
    this.updateVar()
  }
  
  updateVar(){
    const localStorageKey = 'cartItems';
    const storedCartItems: cartProduct[] = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(localStorageKey) || '[]') : [];
    console.log(storedCartItems)
    this.cartItems = storedCartItems
  }

  incrementQuantity(productId: string): void {
    this.store.dispatch(incrementQuantity({ productId }));
    this.updateVar()

  }

  decrementQuantity(productId: string): void {
    this.store.dispatch(decrementQuantity({ productId }));
    this.updateVar()
  }


  // Function to calculate subtotal
  calculateSubTotal(): string {
    let subtotal = 0;
    this.cartItems.forEach(item => {
      subtotal += item.product.price * item.quantity;
    });
    return subtotal.toFixed(2); // Returns a string with 4 digits after decimal
  }

  // Function to calculate total amount to be paid
  calculateTotal(): string {
    return this.calculateSubTotal();
  }

}
