import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
    {path: "" ,component: HomeComponent},
    {path: "checkout/:id" ,component: CheckoutComponent},
    {path: "product/:id", component: ProductComponent},
    {path: "cart", component: CartComponent},
    {path: "**" ,component: PagenotfoundComponent}
];
