

import { Injectable } from '@angular/core';

import {Item} from '../models/product';

import {of} from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class Cart2Service {


  // private itemsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  // private itemsInCart: Product[] = [];

  // constructor() {
  //   this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  // }

  // public addToCart(item: Product) {
  //   this.itemsInCartSubject.next([...this.itemsInCart, item]);
  // }

  // public getItems(): Observable<Product[]> {
  //   return this.itemsInCartSubject;
  // }
}
