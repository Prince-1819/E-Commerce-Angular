import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { cartProduct } from '../Model/Product';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  islogin!: boolean;
  private isloginubscription!: Subscription;
   localStorageKey = 'userData';

  constructor(private router: Router ,private authServiec:AuthService ,private cartService:CartService) {}
  logout(){
    this.authServiec.login = false;
    if(typeof window!=='undefined'){
      const _id:string= localStorage.getItem(this.localStorageKey)??''
      const data:cartProduct[] = JSON.parse(localStorage.getItem('cartItems')??'[]')
      this.cartService.updateCart(_id, data).subscribe(
        () => {
          console.log('Cart updated in database');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Failed to update cart in database:', error);
          // Handle error as needed
        }
      );
    }
    

    if(typeof window!=='undefined'){
      console.log("hello")
      localStorage.setItem(this.localStorageKey,'')
    }
  }
  goToLogin(): void {
    this.router.navigate(['/login']); // Navigate to '/login' route
  }
  ngOnInit(): void {

    this.isloginubscription = this.authServiec.login$.subscribe(
      flag => {
        this.islogin = flag; // Update the  title when it changes
      }
    );
    console.log(this.islogin)
    if(!this.islogin){
      const data = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(this.localStorageKey) || '[]') : [];
    if(data.length>5){
    this.authServiec.login = true;
    }
    }
    console.log(this.islogin) 
  }

  
}
