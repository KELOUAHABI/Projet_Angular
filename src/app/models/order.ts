

import {CartItem} from './cart-item';

export class Order {
    userId: String;
    name: String;
    phone: String;
    adresse: String;
    ville: String;
    departement: String;
    zipcode: String;
    orderDate: String;
    shippingDate: String;
    shippingMethod: String;
    shippingStatus: Boolean;
    products: CartItem[];
}
