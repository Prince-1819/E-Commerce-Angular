import { Component } from '@angular/core';
import { SenddataService } from '../service/senddata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Model/Product';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import * as ProductActions from '../Cart/Product.actions';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-productdetail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.css'
})
export class ProductdetailComponent {
  product: Product |null = null;
  id!:string;
  constructor(private route: ActivatedRoute, private productService:ProductService, private router: Router, private sendDataService: SenddataService , private store: Store) {}

  ngOnInit() {
    this.product = this.sendDataService.getProduct();
    if(!this.product){
      this.id = this.route.snapshot.paramMap.get('id')??'';
      this.productService.getProductById(this.id).subscribe((data: Product) => {
        this.product = data;
      });
    }
  }

  addToCart(product: Product, user_id: string | null): void {
    const data = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('userData') || '[]') : [];
    if(data.length>5){
      user_id = data.user_id
    }
    console.log(product,user_id)
    this.store.dispatch(ProductActions.addItem({ product, user_id }));
  }
}
