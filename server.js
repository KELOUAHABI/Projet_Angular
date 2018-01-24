
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const cors = require('cors');
const passport = require('passport');

const api = require('./server/routes/api');

const order = require('./server/routes/order');
const phone = require('./server/routes/phone');

const users = require('./server/routes/users');

const cart = require('./server/routes/cart');

// Connect To Database
const config = require('./config/database');

mongoose.Promise = global.Promise;

mongoose.connect(config.database, function(err){
    if(err){
        console.error("Error! " + err);
    }
});



// .................
const app = express();


// Port Number
const port = 3000;


// Set distribuable folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors());

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api', api);
app.use('/api', order);
app.use('/api', phone);
app.use('/api', users);
app.use('/api', cart);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});
