const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const phone = require('../models/phone_schema');



router.get('/phones', function (req, res) {
    console.log('Get request for all phones');
    phone.find({})
        .exec(function (err, phones) {
            if (err) {
                console.log("Error retrieving phones");
            } else {
                res.json(phones);
            }
        });
});

router.get('/phones/:id', function (req, res) {
    console.log('Get request for a single phone');
    phone.findById(req.params.id)
        .exec(function (err, phone) {
            if (err) {
                console.log("Error retrieving phone");
            } else {
                res.json(phone);
            }
        });
});

router.post('/phone', function (req, res) {
    console.log('Post a phone');
    var newphone = new phone();
    newphone.code = req.body.code;
    newphone.name = req.body.name;
    newphone.category = req.body.category;
    newphone.brand = req.body.brand;
    newphone.displaysize = req.body.displaysize;
    newphone.display_resolution = req.body.display_resolution;
    newphone.camera_resolution = req.body.camera_resolution;
    newphone.ram = req.body.ram;
    newphone.weight = req.body.weight;
    newphone.storage = req.body.storage;
    newphone.sim = req.body.sim;
    newphone.os = req.body.os;
    newphone.price = req.body.price;
    newphone.priceSansRemise = req.body.priceSansRemise;
    newphone.image = req.body.image;
    newphone.Battery = req.body.Battery;
    newphone.inStockNumber = req.body.inStockNumber;

    newphone.save(function (err, newphone) {
        if (err) {
            console.log('Error saving phone');
        } else {
            res.json(newphone);
        }
    });
});


router.put('/phone/:id', function (req, res) {
    console.log('Update a phone');
    phone.findByIdAndUpdate(req.params.id,
        {
            $set: {
                code: req.body.code,
                name: req.body.name,
                category: req.body.category,
                brand: req.body.brand,
                displaysize: req.body.displaysize,
                display_resolution: req.body.display_resolution,
                camera_resolution: req.body.camera_resolution,
                ram: req.body.ram,
                weight: req.body.weight,
                storage: req.body.storage,
                sim: req.body.sim,
                os: req.body.os,
                price: req.body.price,
                priceSansRemise: req.body.priceSansRemise,
                image: req.body.image,
                Battery: req.body.Battery,
                inStockNumber: req.body.inStockNumber
            }
        },
        {
            new: true
        },
        function (err, updatedphone) {
            if (err) {
                res.send("Error updating phone");
            } else {
                res.json(updatedphone);
            }
        }

    );
});


router.delete('/phone/:id', function (req, res) {
    console.log('Deleting a phone');
    phone.findByIdAndRemove(req.params.id, function (err, deletedphone) {
        if (err) {
            res.send("Error deleting phone");
        } else {
            res.json(deletedphone);
        }
    });
});

module.exports = router;