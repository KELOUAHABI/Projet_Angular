const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order_schema');
const phone = require('../models/phone_schema');

router.get('/orders', function (req, res) {
    console.log('Get request for all orders');
    Order.find({})
        .exec(function (err, orders) {
            if (err) {
                console.log("Error retrieving orders");
            } else {
                res.json(orders);
            }
        });
});


router.post('/order', function (req, res) {

    console.log('Post an oreder');
    var newOrder = new Order({
        userId: req.body.userId,
        nom: req.body.nom,
        phone: req.body.phone,
        adresse: req.body.adresse,
        ville: req.body.ville,
        departement: req.body.departement,
        zipcode: req.body.zipcode,
        products: req.body.products
    });

    newOrder.save(function (err, newOrder) {
        if (err) {
            res.json({ success: false, msg: 'Failed to add item to cart' });
        } else {          
            // newOrder.products.forEach(element => { 

                // phone.findByIdAndUpdate(element.id,
                //     {
                //         $set: {       
                //             phone.inStockNumber : ( phone.inStockNumber - element.qty)
                //         }
                //     },
                //     {
                //         new: true
                //     },
                //     function (err, updatedphone) {
                //         if (err) {
                //             res.send("Error updating phone");
                //         } else {
                //             res.json(updatedphone);
                //         }
                //     }
            
                // );


                // console.log(element.id);  
                // console.log(element.qty);                            
            // });
            
            res.json({ success: true, msg: 'Item added succesfully to cart' });
        }

    });
});


module.exports = router;
