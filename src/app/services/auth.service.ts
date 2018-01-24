import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import { User } from '../models/user';

import { AppConst } from './../../../config/app-const';


@Injectable()
export class AuthService {
  authToken: any;
  user: User;
  userName: any;
  serverPath = AppConst.server_path;

  constructor(private http: Http) {  }

  // Ajouter un client
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.serverPath + '/api/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  // Authentifier un client
  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.serverPath + '/api/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  // Verifier le compte d un client
  // Authorization
  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.serverPath + '/api/users/profile', {headers: headers})
      .map(res => res.json());
  }

  // Enregistrer data dans localStorage
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user_nom', JSON.stringify(user.username));
    localStorage.setItem('user_id', JSON.stringify(user.id));
    this.authToken = token;
    this.user = user;
  }


  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUserName() {
    const userName_stored = localStorage.getItem('user_name');
    this.userName = userName_stored;
  }


  getUserById(id: any) {
    let url = '/api/users/' + id;
    let headers = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('id_token')
    });
    return this.http.get(url, {headers: headers});
  }


  loggedIn() {
    return tokenNotExpired();
  }

  // vider le contenue de local storage, tokenExpired de angular2-jwt n a pas marche
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


}
