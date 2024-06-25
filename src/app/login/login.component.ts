import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { cartProduct } from '../Model/Product';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  formError: string = '';
  emailError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  handleEmailChange(email: string): void {
    this.email = email;

    // Validate email as the user types
  }

  handleSubmit(): void {
    // Reset errors
    this.emailError = '';
    this.formError = '';
  
    // Validate email
    if (!this.email) {
      this.emailError = 'Email is required';
      return;
    }
  
    // Validate password
    if (!this.password) {
      this.formError = 'Password is required';
      return;
    }
  
    // Call AuthService to log in
    this.authService.loginUser(this.email, this.password).subscribe(
      (userData) => {
        console.log('User logged in:', userData);
  
        // Store user data in localStorage
        localStorage.setItem('userData', JSON.stringify(userData._id));
        this.authService.login = true;
  
        // Update cart items with user_id
        this.updateCartItemsUserId(userData._id);
        console.log(userData)

        this.router.navigate(['/']);

  
        // Optionally, you can set a success message or perform other actions here
      },
      (error) => {
        console.error('Login error:', error);
  
        // Display appropriate error message based on error response
        if (error === 'user is not registered.') {
          this.formError = 'User is not registered.';
        } else if (error === 'password is wrong.') {
          this.formError = 'Password is incorrect.';
        } else {
          this.formError = 'Login failed. Please try again.';
        }
      }
    );
  }
  

  private mergeCartItems(dbData: cartProduct[], localStorageItems: cartProduct[] , user_id:string): cartProduct[] {
    const mergedCartItems: cartProduct[] = [];

    // Create a map of dbData for efficient lookup
    let data:cartProduct[];
   dbData.forEach((db_item)=>{
    console.log(db_item.user_id)
    let flag = false;
      localStorageItems.forEach((item)=>{
        if(item.product._id === db_item.product._id){
          flag = true
        }
      })
      if(!flag){
        const addProdct:cartProduct = {
          product: db_item.product,
          user_id: user_id,
          quantity: db_item.quantity
        }
      localStorageItems.push(addProdct)
      }
    })
    console.log(localStorageItems)

    return localStorageItems;
  }


  private updateCartItemsUserId(userId: string): void {
    const cartItems: cartProduct[] =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('cartItems') || '[]')
        : [];

    if (cartItems && cartItems.length > 0) {
      const updatedCartItems = cartItems.map((item: any) => {
        item.user_id = userId;
        return item;
      });

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      console.log('Cart items updated with userId:', userId);
    }
  }
}
