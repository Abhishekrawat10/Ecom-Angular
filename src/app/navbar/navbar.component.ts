import { Component, DoCheck, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductsDataService } from '../services/products-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  productDataServie: ProductsDataService = inject(ProductsDataService);

  searchBarValue: string | "" = '';
  setSearchValue():void{
    this.productDataServie.searchField = this.searchBarValue;
    // console.log(this.productDataServie.searchField);
  }
}
