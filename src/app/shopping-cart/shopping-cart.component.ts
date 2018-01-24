

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Phone } from '../models/phone';

import {CartService} from '../services/cart.service';

import { ShoppingCart } from './../models/shopping-cart';

import { CartItem } from './../models/cart-item';



@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private serverPath = 'http://localhost:3000';
  private selectedPhone: Phone;
  private cartItemList: CartItem[] = [];
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private cartItemUpdated: boolean;
  private emptyCart: boolean;
  private notEnoughStock: boolean;

  private phoneId: number;
  private phone: Phone = new Phone();
  private numberList: number[] = [1,2,3,4,5,6,7,8,9];
  private qty: number;


  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  // select an item in the shopping cart and you want to get more info about it.

  onSelect(phone: Phone) {
    this.selectedPhone = phone;
    this.router.navigate(['/phoneDetail', this.selectedPhone._id]);
  }

  onRemoveCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.id).subscribe(
      res => {
        console.log(res.text());
        this.getCartItemList();
        this.getShoppingCart();
      },
      error => {
        console.log(error.text());
      }
    );
  }


  onUpdateCartItem(cartItem: CartItem) {
    this.cartService.updateCartItem(cartItem.id, cartItem.qty).subscribe(
      res => {
        console.log(res.text());
        this.cartItemUpdated = true;
        this.getShoppingCart();
      },
      error => {
        console.log(error.text());
      }
    );
  }


  getCartItemList()  {
    this.cartService.getCartItemList().subscribe(
      res => {
        this.cartItemList = res.json();
        this.cartItemNumber = this.cartItemList.length;
      },
      error => {
        console.log(error.text());
      }
    );
  }


  getShoppingCart() {
    this.cartService.getShoppingCart().subscribe(
      res => {
        console.log(res.json());
        this.shoppingCart = res.json();
      },
      error => {
        console.log(error.text());
      }
    );
  }


  onCheckout() {
    if (this.cartItemNumber == 0) {
      this.emptyCart = true;
    } else {
      for (let item of this.cartItemList) {
        if (item.qty > item.phone.inStockNumber) {
          console.log('not enough stock on some item');
          this.notEnoughStock = true;
          return;
        }
      }
      this.router.navigate(['/order']);
    }
  }


  ngOnInit() {
    // this.getCartItemList();
    // this.getShoppingCart();
  }


}
