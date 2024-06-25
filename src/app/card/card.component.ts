import { Component, OnInit } from '@angular/core';
import { cartProduct } from '../Model/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  totalPayment: number = 0; // Replace with your actual total payment logic or data source
  name: string = '';
  phone: string = '';
  address: string = '';
  cardNo: string = '';
  cvv: string = '';
  expiryDate: string = '';
  error: string = '';

  ngOnInit(): void {
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
    // Validate the form
    if (!this.name || !this.phone || !this.address || !this.cardNo || !this.cvv || !this.expiryDate) {
      this.error = 'Please fill out all fields.';
      return;
    }

    // Further validation logic can be added here (e.g., checking formats, etc.)

    // Reset error message
    this.error = '';

    // Simulate submission or integrate with your backend API
    console.log('Form submitted successfully!');
    console.log('Name:', this.name);
    console.log('Phone:', this.phone);
    console.log('Address:', this.address);
    console.log('Card Number:', this.cardNo);
    console.log('CVV:', this.cvv);
    console.log('Expiry Date:', this.expiryDate);

    // You can add further logic here, like sending data to backend or processing
  }

}
