import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProductlistComponent } from '../productlist/productlist.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductlistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToProducts() {
    this.router.navigate(['/products']);
  }
}
