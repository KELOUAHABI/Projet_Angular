


import { Injectable } from '@angular/core';

// import { User } from '../models/user';
// import { Order } from './../models/order';

@Injectable()
export class ValidateService {

  // user: User;
  // order: Order;

  constructor() { }

  validateRegister(user) {
    if ( user.name === undefined || user.email === undefined || user.username === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
  }


  validateShipping(order) {
    if ( order.nom === undefined ||
      order.phone === undefined ||
      order.adresse === undefined ||
      order.ville === undefined  ||
      order.departement === undefined ||
      order.zipcode === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
