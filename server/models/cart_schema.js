
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    id: Number,
    phoneId: String,
    qty: Number,
    subtotal: Number,
    phone: String,
});

module.exports = mongoose.model('cart', cartSchema, 'carts');