

import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute, Router} from '@angular/router';
// import {Http} from '@angular/http';

import { Phone } from '../models/phone';
import { PhoneService } from '../services/phone.service';

// import { CartService } from '../services/cart.service';
import { DataObserverService } from '../services/data-observer.service';
import { Item } from './../models/product';

import {AppConst} from '../../../config/app-const';


@Component({
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.css']
})
export class PhoneDetailComponent implements OnInit {
  private phoneId: any;
  private phonePrice: any;

  public phone: Phone = new Phone();
  private serverPath = AppConst.server_path;
  private numberList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  private addPhoneSuccess: boolean = false;
  private notEnoughStock: boolean = false;

  private sub: any;

  categories = ['Apple', 'Samsung', 'Huawei', 'Xiaomi '];


  // id: string;
  // price: number;
  // subtotal: number;
  // brand: string;
  // name: string;
  // image: string;
  qty: number;

  constructor(
    private phoneService: PhoneService,
    private router: Router,
    private route: ActivatedRoute,
    private _cartService: DataObserverService
    ) { }



  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.phoneId = params['id'];
    });

    this.phoneService.getPhone(this.phoneId).subscribe(
      res => {
        this.phone = res.json();
        this.phonePrice = this.phone.price;
      },
      error => {
        console.log(error);
      }
    );

    this.qty = 1;

  }


  onAddToCart() {
    const item2add = {
      id : this.phone._id,
      price : this.phone.price,
      qty : this.qty,
      brand: this.phone.brand,
      name: this.phone.name,
      image: this.phone.image,
      subtotal : this.phonePrice * this.qty,
      added: true,
    };

    this.addPhoneSuccess = true;
    // console.log(item2add);
    this._cartService.addProduct(item2add);
  }



}
