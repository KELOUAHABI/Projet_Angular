

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from './../services/validate.service';

import { DataObserverService } from './../services/data-observer.service';
import { Item } from './../models/product';
import { CartState } from './../shopping-cart2/cartestate';
import { OrderService } from './../services/order.service';
import { PhoneService } from './../services/phone.service';
import { AuthService } from './../services/auth.service';

import { AppConst } from './../../../config/app-const';
import { Phone } from './../models/phone';
import { User } from './../models/user';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  stateList = AppConst.stateList;

  nom: String;
  phone: String;
  adresse: String;
  ville: String;
  departement: String;
  zipcode: String;

  _name: String;

  products: Item[];

  public user: User = new User();

  constructor(
    private router: Router,
    private _flashMessagesService: FlashMessagesService,
    private validateService: ValidateService,
    private _cartService: DataObserverService,
    private _orderService: OrderService,
    private _phoneService: PhoneService,
    private _authService: AuthService,
  ) { }

  public updatePhone: Phone = new Phone();

  ngOnInit() {
    this._cartService
      .CartState
      .subscribe((state: CartState) => {
        this.products = state.products;
        // console.log(this.products);
      });

    this._authService
      .getUserById(JSON.parse(localStorage.getItem('user_id')))
      .map(res => res.json())
      .subscribe(res => {
        console.log(JSON.stringify(res));
        this.user.name = JSON.parse(res.name);
        this.user.phone = JSON.parse(res.phone);
        this.user.adresse = JSON.parse(res.adresse);
        this.user.ville = JSON.parse(res.ville);
        this.user.departement = JSON.parse(res.departement);
        this.user.zipcode = JSON.parse(res.zipcode);

        this.nom = this.user.name;
        this.phone = this.user.phone;
        this.adresse = this.adresse;
        this.ville = this.user.ville;
        this.departement = this.user.departement;
        this.zipcode = this.user.zipcode;

      });
  }


  onOrdreSubmit() {

    const u_Id: string = localStorage.getItem('user_id');
    let newInStockNumber: number;

    const order = {
      userId: u_Id,
      nom: this.nom,
      phone: this.phone,
      adresse: this.adresse,
      ville: this.ville,
      departement: this.departement,
      zipcode: this.zipcode,
      products: this.products,
    };

    // if (!this.validateService.validateShipping(order)) {
    //   this._flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
    //   return false;
    // }

    this._orderService.registerOrder(order).subscribe( data => {
      if (data.success) {

        // loop over products.id  (i.e. phone id)
        // envoi requette http utilisant service phone pour update qty
        // il faut faire un check si la quantite est suffisante ... a faire apres succe update

        // console.log('iterate over p :');

        order.products.forEach( p => {
          this._phoneService.getPhone(p.id).subscribe(
            res => {
              this.updatePhone = res.json();
              // console.log('updated phone');
              // console.log(this.updatePhone);
              newInStockNumber = this.updatePhone.inStockNumber - p.qty;
              this.updatePhone.inStockNumber = newInStockNumber;
              this._phoneService.updatePhone(this.updatePhone).subscribe();
            },
            error => {
              console.log(error);
            });
          }
        );

        this._flashMessagesService.show('Votre ordre est place, merci...', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/home']);
      } else {
        this._flashMessagesService.show('Probleme est survenu ...', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/checkOut']);
      }
    });


  }

}
