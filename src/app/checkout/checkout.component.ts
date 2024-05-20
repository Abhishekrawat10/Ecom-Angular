import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsDataService } from '../services/products-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  constructor(private _Activatedroute: ActivatedRoute) {}

  prod: any;
  formValid: boolean= false;
  productId: string | null = this._Activatedroute.snapshot.paramMap.get('id');
  productService: ProductsDataService = inject(ProductsDataService);

  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl(null,[Validators.required]),
    lastName: new FormControl(null,Validators.required),
    address: new FormControl(null, Validators.required),
  });

  async ngOnInit(): Promise<any> {
    this.prod = await this.productService.getProduct(this.productId);
    console.log(this.prod);
    this.formValid = this.profileForm.status === 'INVALID' ? false : true;
    console.log('formValidation', this.formValid);
    console.log(this.profileForm.status);
  }

  buyProd(): void {
    console.log(this.prod);
    console.log('form', this.profileForm.status);
  }
}
