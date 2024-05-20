import { Component, OnInit, inject } from '@angular/core';
import { ProductsDataService } from '../services/products-data.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  constructor(private _Activatedroute: ActivatedRoute) {}
  productService: ProductsDataService = inject(ProductsDataService);

  product: any;
  id: string | null = this._Activatedroute.snapshot.paramMap.get('id');

  async ngOnInit(): Promise<any> {
    this.product = await this.productService.getProduct(this.id);
    console.log(this.product);
  }

  buyProduct(prod:any):void{
    console.log(prod);
  }
}
