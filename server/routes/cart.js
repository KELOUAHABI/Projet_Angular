
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Cart_Item = require('../models/cart_schema');

router.post('/cart/add', function(req, res) {
  console.log('add item to cart');

  var newCart_item = new Cart_Item();

  newCart_item.phoneId = req.body.phoneId;
  newCart_item.qty = req.body.qty;

  newCart_item.save(function(err, insertedItem){
    if (err){
        console.log('Error adding item to cart');
    }else{
        res.json(insertedItem);
    }
  });
});




router.get('/cart/getCartItemList', function(req, res) {
    
    console.log('/cart/getCartItemList');

});


router.get('/cart/getShoppingCart', function(req, res) {
    
    console.log('/cart/getShoppingCart');

});


router.get('/cart/updateCartItem', function(req, res) {
    
    console.log('/cart/updateCartItem');

});


router.get('/cart/removeItem', function(req, res) {
    
    console.log('/cart/removeItem');

});



module.exports = router;