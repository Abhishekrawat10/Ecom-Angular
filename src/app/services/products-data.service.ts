import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataService {
  constructor() {}

  async getProducts(): Promise<any> {
    let data = await fetch('https://fakestoreapi.com/products');
    data = await data.json();
    return data;
  }

  async getProduct(id: string | null): Promise<any> {
    let data = await fetch(`https://fakestoreapi.com/products/${id}`);
    data = await data.json();
    return data;
  }
}
