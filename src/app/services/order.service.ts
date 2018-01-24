

import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppConst } from './../../../config/app-const';
import { Order } from './../models/order';

@Injectable()
export class OrderService {

  serverPath = AppConst.server_path;
  authToken: any;
  order: Order;

  constructor(private http: Http) { }

  registerOrder(order) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // console.log('order.service.ts : ' + JSON.stringify(order));
    return this.http.post(this.serverPath + '/api/order', order, {headers: headers})
    // return this.http.post('http://localhost:3000/api/users/register', user, {headers: headers})
      .map(res => res.json());
  }

}
