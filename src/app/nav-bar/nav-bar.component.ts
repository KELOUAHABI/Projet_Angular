
import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../services/auth.service';
import { AuthModule } from 'angular2-jwt';

import { DataObserverService } from './../services/data-observer.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userName: String ;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _cartService: DataObserverService,
    private flashMessage: FlashMessagesService ) { }

  ngOnInit() {

  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success',
      timeout: 3000
    });

    this._cartService.emptyCart();

    this.router.navigate(['/login']);
    return false;
  }

  loggedIn() {
    const token = localStorage.getItem('id_token');

    if (token || null) {
      return true;
   } else {
      return false;
   }
  }

  getUserName() {
    this.userName = this.authService.userName;
    console.log(this.userName);
  }



}
