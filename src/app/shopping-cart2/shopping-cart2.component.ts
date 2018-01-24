
import { Component, OnInit, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/map';

import { Item } from './../models/product';

import { Subscription } from 'rxjs/Subscription';
import { DataObserverService } from './../services/data-observer.service';
import { CartState } from './../shopping-cart2/cartestate';


@Component({
  selector: 'app-shopping-cart2',
  templateUrl: './shopping-cart2.component.html',
  styleUrls: ['./shopping-cart2.component.css']
})


export class ShoppingCart2Component implements OnInit {

  loaded: boolean = true;
  CartItems: Item[];
  products: Item[];
  cartItemNumber: number;

  private subscription: Subscription;


  constructor(
    private _cartService: DataObserverService
  ) { }

  ngOnInit() {

    this._cartService
        .CartState
        .subscribe((state: CartState) => {
            this.products = state.products;
            // console.log(this.products);
    });

    this.cartItemNumber = this.products.length;
  }

  deleteItem(id: number) {
    this._cartService.removeProduct(id);
    this.cartItemNumber = this.products.length;
  }

  getTotalPrice() {
    let total: number = 0.0;
    this.products.forEach( p => total += p.subtotal );
    return total;
}
}
