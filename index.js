const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const app = express();
const path = require('path');
const passport = require("passport")
const session = require("express-session")
const cookieParser = require("cookie-parser")

// console.log(process.env);
// connect database

connectDB();
// init middleware
app.use('/public', express.static(__dirname + '/public'));
// app.use(express.static('./public'));
app.use(express.json({ extended: false }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Request-Headers', 'GET, PUT, POST, DELETE');
  next();
});
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());
// define routes

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));


// if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
// }
//set port
const PORT = process.env.PORT || 2900;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
