import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cartProduct } from '../Model/Product';

@Component({
  selector: 'app-cash',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './cash.component.html',
  styleUrl: './cash.component.css'
})
export class CashComponent implements OnInit {
  name!: string ;
  phone!: string;
  address!: string;
  totalPayment!: number;
  error!:string

  ngOnInit() {
    // Retrieve total payment from local storage or API call
    const storedTotalPayment:cartProduct[] =typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cartItems') || '[]') : [];
    console.log(storedTotalPayment)
    this.totalPayment = this.calculateTotalPayment(storedTotalPayment);
  }

  calculateTotalPayment(cartItems: cartProduct[]): number {
    let total = 0;
    // Calculate total payment based on cart items logic
    for (const item of cartItems) {
      // Assuming each item has a 'price' property
      total += (item.product.price *item.quantity);
    }
    return total;
  }

  onSubmit() {
    // Handle form submission logic here
    if(!this.name || !this.phone ||!this.address){
      this.error = "Feel All the fields"
    }
    else{
      this.error = ""
    }
    // console.log('Form submitted');
    // console.log('Name:', this.name);
    // console.log('Phone:', this.phone);
    // console.log('Address:', this.address);
    // console.log('Total Payment:', this.totalPayment);
    alert("Order Succesfully Placed");
  }


}
