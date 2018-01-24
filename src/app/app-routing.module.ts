

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PhonesComponent } from './phones/phones.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderComponent } from './order/order.component';
import { PhoneDetailComponent } from './phone-detail/phone-detail.component';

import { ShoppingCart2Component } from './shopping-cart2/shopping-cart2.component';
import { CheckOutComponent } from './check-out/check-out.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'phones',
    component: PhonesComponent
  },
  {
    path: 'cart',
    component: ShoppingCart2Component
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'checkOut',
    component: CheckOutComponent
  },
  {
    path: 'myProfile',
    component: ProfileComponent
  },
  {
    path: 'phoneDetail/:id',
    component: PhoneDetailComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
