const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const phoneSchema = new Schema({
    code: String,
    name: String,
    category: String,
    brand: String,
    displaysize: String,
    display_resolution: String,
    camera_resolution: String,
    ram: String,
    weight: String,
    storage: String,
    sim: String,
    os: String,
    price: Number,
    priceSansRemise: Number,
    image: String,
    Battery: String,
    inStockNumber: Number,
    description: String,
});

module.exports = mongoose.model('phone', phoneSchema, 'phones');