import { Component, OnInit, inject } from '@angular/core';
import { ProductsDataService } from '../services/products-data.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  constructor(private _Activatedroute: ActivatedRoute, private router: Router) {}
  productService: ProductsDataService = inject(ProductsDataService);

  product: any;
  id: string | null = this._Activatedroute.snapshot.paramMap.get('id');

  async ngOnInit(): Promise<any> {
    this.product = await this.productService.getProduct(this.id);
  }

  navigateToRoute(route:string){
    this.router.navigate([route]);
  }

  buyProduct(prod:any):void{
    this.navigateToRoute(`checkout/${prod.id}`)
    console.log(prod);
  }
}
