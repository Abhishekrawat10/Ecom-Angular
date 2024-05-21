import { Injectable } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataService{
  constructor() {}

  products: any = [];
  searchField: string | "" = "";

  async fetchProducts(): Promise<any> {
    let data = await fetch('https://fakestoreapi.com/products');
    data = await data.json();
    this.products = data;
  }

  // setSerchFieldValue(value: string): void {
  //   this.searchField = value;
  // }

  getProducts(serarchVal:string| ""): any {
    // console.log('in product data service', serarchVal);
    let filterProduct: []= this.products.filter(
      (e: any) => {
        return e.title.toLowerCase().includes(serarchVal.toLowerCase());
      }
    );
    return filterProduct;
  }

  async getProduct(id: string | null): Promise<any> {
    let data = await fetch(`https://fakestoreapi.com/products/${id}`);
    data = await data.json();
    return data;
  }
}
