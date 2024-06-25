import { Injectable } from '@angular/core';
import { Product } from '../Model/Product';

@Injectable({
  providedIn: 'root'
})
export class SenddataService {
  private selectedProduct: Product | null = null;

  setProduct(product: Product) {
    this.selectedProduct = product;
  }

  getProduct(): Product | null {
    return this.selectedProduct;
  }
  constructor() { }
}
