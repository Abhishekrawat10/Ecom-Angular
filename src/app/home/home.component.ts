import { Component, DoCheck, OnInit, inject } from '@angular/core';
import { ProductsDataService } from '../services/products-data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, DoCheck {
  products: any = [];
  ck: boolean = false;
  productService: ProductsDataService = inject(ProductsDataService);
  searchVal: string | '' = '';
  constructor(private router: Router) {}

  buyThis(id: object): void {
    console.log(id);
    console.log('inputfiled Val;ue', this.productService.searchField);
  }

  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }

  cart: Array<object> = [];
  cartMap = new Map();
  showProduct(prod: any): void {
    console.log(prod);
    this.navigateToRoute(`product/${prod.id}`);
  }

  addToCart(prod: any): void {
    this.cart.push(prod);
    if (this.cartMap.has(prod.id)) {
      let count: number = this.cartMap.get(prod.id) + 1;
      console.log(count);
      this.cartMap.set(prod.id, count);
    } else {
      this.cartMap.set(prod.id, 1);
      console.log(this.cart);
    }
    let cartStuff = JSON.stringify(Array.from(this.cartMap.entries()));
    localStorage.setItem('cart', cartStuff);
    console.log('loclasStorage', this.cartMap);
  }

  async ngDoCheck(): Promise<any> {
    if (this.searchVal !== this.productService.searchField) {
      this.searchVal = this.productService.searchField;
      this.products = await this.productService.getProducts(this.searchVal);
      // console.log("insidenng chek",this.productService.searchField)
      // console.log(this.products)
    }
  }
  async ngOnInit(): Promise<any> {
    await this.productService.fetchProducts();
    console.log(this.productService.products);
    this.searchVal = this.productService.searchField;
    this.products = this.productService.getProducts('');
    let cartItem: string | null = localStorage.getItem('cart');
    if (typeof cartItem === 'string') {
      this.cartMap = new Map(JSON.parse(cartItem));
      console.log('CartMap', this.cartMap);
    }
    this.ck = true;
  }
}
