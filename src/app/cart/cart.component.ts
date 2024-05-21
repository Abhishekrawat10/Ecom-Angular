import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ProductsDataService } from '../services/products-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, DoCheck {
  cartMap = new Map();
  check: boolean = false;
  products: any = [];
  productService: ProductsDataService = inject(ProductsDataService);
  selectedProducts = new Map();
  selectedProductsArray: any = [];
  totalPrice: number = 0;

  localStorageLength: number = 0;

  async showList(): Promise<any> {
    this.cartMap = new Map();
    this.selectedProducts  = new Map();
    this.selectedProductsArray = [];
    let cartStuff: string | null = localStorage.getItem('cart');
    if (typeof cartStuff === 'string') {
      this.cartMap = new Map(JSON.parse(cartStuff));
      this.localStorageLength = this.cartMap.size;
      console.log('CartMap', this.cartMap);
      this.products = await this.productService.getProducts("");
      for (let [key, value] of this.cartMap) {
        let product = this.products.find((p: any) => p.id === +key);
        this.selectedProducts.set(product, value);
        this.totalPrice += product.price * value;
      }
      console.log('Selected Product', this.selectedProducts);
      this.selectedProductsArray = Array.from(this.selectedProducts.entries());
      console.log('Selected Products Array', this.selectedProductsArray);
      this.check = true;
    } else {
      this.check = false;
    }
  }

  ngOnInit(): void {
    console.log('onitnicalled');
    this.showList();
  }

  ngDoCheck(): void {
    let currentLen: number = this.localStorageLength;
    let cartStuff: string | null = localStorage.getItem('cart');
    if (typeof cartStuff === 'string') {
      this.cartMap = new Map(JSON.parse(cartStuff));
      currentLen = this.cartMap.size;
    }
    if (currentLen !== this.localStorageLength) {
      this.localStorageLength = currentLen;
      console.log('CurrneLent', this.localStorageLength);
      this.showList();
    }
    if(this.localStorageLength===0){
      this.check=false;
    }
  }

  removeProd(prod: any) {
    // gettint the prodcuet
    let productId = prod[0].id;
    let productCount = prod[1] - 1;

    this.cartMap.set(productId, productCount);

    // // recalculateing price
    this.totalPrice = 0;
    for (let [key, value] of this.cartMap) {
      let product = this.products.find((p: any) => p.id === +key);
      if (product) {
        this.totalPrice += product.price * value;
      }
    }

    if (productCount === 0) {
      console.log('here');
      console.log(this.cartMap.delete(productId));
    }
    console.log('CartMap', this.cartMap);

    localStorage.setItem(
      'cart',
      JSON.stringify(Array.from(this.cartMap.entries()))
    );

    let producCount: number = prod[1] - 1;
    this.selectedProducts.set(prod[0], producCount);
    this.selectedProductsArray = Array.from(this.selectedProducts.entries());
  }
  addProd(prod: any) {
    let productId = prod[0].id;
    let productCount = prod[1] + 1;

    this.cartMap.set(productId, productCount);
    // console.log('CartMap', this.cartMap);
    localStorage.setItem(
      'cart',
      JSON.stringify(Array.from(this.cartMap.entries()))
    );

    // recalculateing price
    this.totalPrice = 0;
    for (let [key, value] of this.cartMap) {
      let product = this.products.find((p: any) => p.id === +key);
      if (product) {
        this.totalPrice += product.price * value;
      }
    }

    // editing in the selectedProduct and the updating the
    let producCount: number = prod[1] + 1;
    // console.log("prod",prod[0]);
    // console.log("selcetdarray",this.selectedProducts)
    this.selectedProducts.set(prod[0], producCount);
    this.selectedProductsArray = Array.from(this.selectedProducts.entries());
  }
}
