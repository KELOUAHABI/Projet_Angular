
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');

const User = require('../models/user');

// Register
router.post('/users/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    phone: req.body.phone,
    password: req.body.password,
    adresse: req.body.adresse,
    ville: req.body.ville,
    departement: req.body.departement,
    zipcode: req.body.zipcode,
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/users/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    } 

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 semaine (en seconde) 
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            adresse: user.adresse,
            ville: user.ville,
            departement: user.departement,
            zipcode: user.zipcode
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/users/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

//get all users
router.get('/users', function(req, res){
  console.log('Get request for all Users');
  User.find({})
  .exec(function(err, users){
      if (err){
          console.log("Error retrieving Users");
      }else {
          res.json(users);
      }
  });
});


//get user by id
router.get('/users/:id', function(req, res){
  console.log('Get request for a single user by Id');
  User.findById(req.params.id)
  .exec(function(err, user){
      if (err){
          console.log("Error retrieving user");
      }else {
          res.json(user);
      }
  });
});



module.exports = router;
