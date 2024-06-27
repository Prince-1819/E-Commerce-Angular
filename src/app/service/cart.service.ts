import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin } from 'rxjs';
import { Cart, cartProduct } from '../Model/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getCart(userId: string): Observable<Cart> {
    console.log(userId)
    return this.http.get<Cart>(`${this.apiUrl}/api/cart/${userId}`);
  }

  updateCart(userId: string, cartItems: cartProduct[]): Observable<Cart[]> {
    const updateRequests: Observable<Cart>[] = [];

    cartItems.forEach(item => {
      console.log(userId,item.product._id , item.quantity)
      updateRequests.push(
        this.http.post<Cart>(`${this.apiUrl}/api/cart`, {
          userId: userId,
          productId: item.product._id,
          quantity: item.quantity
        })
      );
    });

    // Use forkJoin to execute all requests concurrently
    return forkJoin(updateRequests).pipe(
      catchError(error => {
        throw new Error('Failed to update cart');
      })
    );

  }
}


