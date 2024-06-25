import { Component } from '@angular/core';
import { Product } from '../Model/Product';
import { ProductService } from '../service/product.service';
import { NgFor } from '@angular/common';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [NgFor,ProductComponent],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
}
