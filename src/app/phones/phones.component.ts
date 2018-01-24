


import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute, Router} from '@angular/router';

// import Http to use get method
import { Http } from '@angular/http';


// import rxjs to be able to map data to json format
// import 'rxjs/add/operator/map';


import { PhoneService } from '../services/phone.service';
import { CartService } from '../services/cart.service';
import { Phone } from './../models/phone';
import { PricePipe } from './../pipes/price.pipe';
import { BrandPipe } from './../pipes/brand.pipe';

/////////////////////////
// this import the phones from a class instead of the server
// for compilation purpose
// import { phones } from './../data/phones';
//
// to add the phones in the declaration of :   phones: Array<any>;     -->    phones: Array<any> = phones;



@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css'],
  // pipes: [PricePipe]
})
export class PhonesComponent implements OnInit {

  // the array that will hold the data
  phones: Array<any>;
  copyphones: Array<any> = [];

  error: string;

  public cart = [];

  public categories = ['All', 'Apple', 'Samsung', 'Huawei', 'Xiaomi'];

  // fake url pointing to the local json file
  // _url = '../data/phones.json';

  // real data pointin to the servers data
  // the data request url : see  "server.js"
  // _getUrl = 'api/phones';


  //////////////////////////////////////
  // inject the Http service into the constructor method so we can use it
  constructor(
      private http: Http,
      private phoneService: PhoneService,
      private router: Router,
      private route: ActivatedRoute,
      private cartService: CartService
    ) { }

    private phoneId: number;
    private phone: Phone = new Phone();
    private serverPath = 'http://localhost:3000';
    private numberList: number[] = [1,2,3,4,5,6,7,8,9];
    private qty: number;

    private selectedPhone: Phone;

    private addPhoneSuccess: boolean = false;
    private notEnoughStock: boolean = false;

  // in th OnInit import the data and save it into 'phones' array
  // this method should be implemented as a service
  ngOnInit() {
    this.phoneService.getAllPhones().subscribe(
      data => this.phones = data,
      error => this.error  = error.statusText,
      () => this.copyphones = this.phones
    );
  }


  ////////////////////////////////////////


  // onAddToCart() {
  //   this.cartService.addItem(this.phoneId, this.qty).subscribe(
  //     res => {
  //       console.log(res.text());
  //       this.addPhoneSuccess = true;
  //     },
  //     err => {
  //       console.log(err.text());
  //       this.notEnoughStock = true;
  //     }
  //   );
  // }

  // cartAdd(item) {
  //   this.cart.push(item);
  //   console.log(this.cart);
  //   console.log(this.cart.length);
  //   localStorage.cartItems = JSON.stringify(this.cart);
  // }

  ////////////////////////////////////////

  onSelect(phone: Phone) {
    this.selectedPhone = phone;
    this.router.navigate(['/phoneDetail', this.selectedPhone._id]);
  }



  ///////////////////////
  filterBy(filter: string) {
    switch (filter) {

    case 'All':
      this.phones = this.copyphones;
      console.log('all countries clicked');
      break;

    case 'Apple':
      this.phones = this.copyphones;
      this.phones = this.phones.filter(data => {
        return data.brand.toLowerCase().includes('apple');
      });
      console.log('show only Apple phones');
      break;

    case 'Samsung':
      this.phones = this.copyphones;
      this.phones = this.phones.filter(data => {
        return data.brand.toLowerCase().includes('samsung');
      });
      console.log('show only Apple phones');
      break;

    case 'Huawei':
      this.phones = this.copyphones;
      this.phones = this.phones.filter(data => {
        return data.brand.toLowerCase().includes('huawei');
      });
      console.log('show only Apple phones');
      break;

    case 'Xiaomi':
      this.phones = this.copyphones;
      this.phones = this.phones.filter(data => {
        return data.brand.toLowerCase().includes('xiaomi');
      });
      console.log('show only Apple phones');
      break;
   }
  }

}


