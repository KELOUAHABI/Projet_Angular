
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Item } from './../models/product';
import { CartState } from './../shopping-cart2/cartestate';

@Injectable()
export class DataObserverService {

  constructor(private http: Http) { }

  // private cartSubject = new Subject<CartState>();

  private cartSubject = new BehaviorSubject<CartState>(null);

  Products: Item[] = [];
  public itemsNumber: number;


  CartState = this.cartSubject.asObservable();

  addProduct(_product: any) {
    this.Products.push(_product);
    localStorage.cartItemNumber = this.Products.length;
    this.cartSubject.next(<CartState>{loaded: true, products: this.Products});
  }

  removeProduct(id: number) {
    this.Products = this.Products.filter((_item) =>  _item.id !== id );
    localStorage.cartItemNumber = this.Products.length;
    this.cartSubject.next(<CartState>{loaded: false , products:  this.Products});
  }

  emptyCart() {
    this.Products = [];
    this.cartSubject.next(<CartState>{loaded: false , products:  this.Products});
  }


}
