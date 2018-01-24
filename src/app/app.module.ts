

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import 'hammerjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { PhonesComponent } from './phones/phones.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { OrderService } from './services/order.service';

import { PhoneService } from './services/phone.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CartService } from './services/cart.service';
import { OrderComponent } from './order/order.component';
import { PhoneDetailComponent } from './phone-detail/phone-detail.component';
import { ShoppingCart2Component } from './shopping-cart2/shopping-cart2.component';

import { DataObserverService } from './services/data-observer.service';
import { PricePipe } from './pipes/price.pipe';
import { BrandPipe } from './pipes/brand.pipe';

import { TreeviewModule } from 'ngx-treeview';
import {NgxPaginationModule} from 'ngx-pagination';
import {DataTableModule} from 'angular2-datatable';
import { CheckOutComponent } from './check-out/check-out.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    PhonesComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ShoppingCartComponent,
    OrderComponent,
    PhoneDetailComponent,
    ShoppingCart2Component,
    PricePipe,
    BrandPipe,
    CheckOutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    FlashMessagesModule,
    MaterialModule,
    NoopAnimationsModule,
    NgxPaginationModule,
    DataTableModule,
    TreeviewModule.forRoot()
  ],
  providers: [
    ValidateService,
    AuthService,
    PhoneService,
    CartService,
    OrderService,
    DataObserverService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
