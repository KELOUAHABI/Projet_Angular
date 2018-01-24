
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Phone } from '../models/phone';

@Injectable()
export class PhoneService {

  private _getUrl = '/api/phones/';
  private _postUrl = '/api/phone/';
  private _putUrl = '/api/phone/';
  private _deleteUrl = '/api/phone/';

  constructor(private _http: Http) { }

  getAllPhones() {
    let url = this._getUrl;

    let tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('id_token')
    });
    return this._http.get(url, {headers: tokenHeader}).map(res => res.json());
  }


  getPhone(id: number) {
    let url = this._getUrl + id;

    let tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('id_token')
    });
    return this._http.get(url, {headers: tokenHeader});
  }

  addPhone(phone: Phone) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._postUrl, JSON.stringify(phone), options)
      .map((response: Response) => response.json());
  }

  updatePhone(phone: Phone) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this._putUrl + phone._id, JSON.stringify(phone), options)
      .map((response: Response) => response.json());
  }

  deletePhone(phone: Phone) {
    return this._http.delete(this._deleteUrl + phone._id)
      .map((response: Response) => response.json());
  }
}
