import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataService {
  constructor(private http: HttpClient) {}

  products: any = [];
  searchField: string | '' = '';

  url = 'https://fakestoreapi.com/products';

  async fetchProducts(): Promise<any> {
    this.products = await firstValueFrom(this.http.get(this.url));
  }
  getProducts(serarchVal: string | ''): any {
    let filterProduct: [] = this.products.filter((e: any) => {
      return e.title.toLowerCase().includes(serarchVal.toLowerCase());
    });
    return filterProduct;
  }

  async getProduct(id: string | null): Promise<any> {
    let data = await fetch(`https://fakestoreapi.com/products/${id}`);
    data = await data.json();
    return data;
  }
}
