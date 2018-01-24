

import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

import { AppConst } from './../../../config/app-const';

@Injectable()
export class CartService {

  serverPath = AppConst.server_path;

  constructor(private http: Http) { }

  addItem(phoneId: number, qty: number) {
    let url = this.serverPath + '/api/cart/add';
    let cartItemInfo = {
      "phoneId": phoneId,
      "qty": qty
    };
    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('id_token')
    });
    return this.http.post(url, cartItemInfo, { headers: tokenHeader });
  }

  getCartItemList() {
    let url = this.serverPath + '/api/cart/getCartItemList';

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('id_token')
    });
    return this.http.get(url, { headers: tokenHeader });
  }


  getShoppingCart() {
    let url = this.serverPath + '/api/cart/getShoppingCart';

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('id_token')
    });
    return this.http.get(url, { headers: tokenHeader });
  }


  updateCartItem(cartItemId: number, qty: number) {
    let url = this.serverPath + '/api/cart/updateCartItem';
    let cartItemInfo = {
      "cartItemId": cartItemId,
      "qty": qty
    }
    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('id_token')
    });
    return this.http.post(url, cartItemInfo, { headers: tokenHeader });
  }


  removeCartItem(id: number) {
    let url = this.serverPath + '/api/cart/removeItem';

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('id_token')
    });
    return this.http.post(url, id, { headers: tokenHeader });
  }


}
