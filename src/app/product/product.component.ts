import { Component, Input } from '@angular/core';
import { Product, cartProduct } from '../Model/Product';
import { Router } from '@angular/router';
import { SenddataService } from '../service/senddata.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import * as ProductActions from '../Cart/Product.actions';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: Product;

  constructor(private router: Router, private sendDataService: SenddataService , private store: Store) {}

  addToCart(product: Product, user_id: string | null): void {
    const data = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('userData') || '[]') : [];
    let id = localStorage.getItem('userId')
    if(data.length>5){
      id = data
    }
    console.log(product,id)
    this.store.dispatch(ProductActions.addItem({ product, user_id:id }));
  }

  goToProductDetail(product: Product) {
    console.log(product)
    this.sendDataService.setProduct(product);
    this.router.navigate(['/product', product._id]);
  }
}
