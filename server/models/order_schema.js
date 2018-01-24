const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const Cart_Item = require('./cart_schema');



const orderSchema = new Schema({
    userId: String,
    nom: String,
    phone: String,
    adresse: String,
    ville: String,
    departement: String,
    zipcode: String,
    orderDate: { type: Date, default: Date.now  },
    shippingDate: { type: Date, default: Date.now },
    shippingMethod: { type: String, default: "" },
    shippingStatus: { type: Boolean, default: false },
    products: [Schema.Types.Mixed],

});

module.exports = mongoose.model('order', orderSchema, 'orders');