// THIS IS THE USER SCHEMA FILE
//@ts-nocheck
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  lastName: {
    type: String,
    // required: true
  },
  userName: {
    type: String,
  },
  phone: {
    type: Number,
  },
  location: {
    type: String,
  },
  firstName: {
    type: String,
  },
  email: {
    type: String,
    // required: true,
    // unique: true
  },
  password: {
    type: String,
    // required: true
  },
  googleId: {
    type: String,
  },

  method: {
    type: String,
  },
  dashboardBuildStep: {
    type: Number,
    default: 1,
  },
  avatar: {
    type: String,
  },
  registrationStep: {
    type: Number,
    default: 2,
  },
  usertype: {
    type: String,
  },
  facebookid: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  regComplete: {
    type: Boolean,
    default: false,
  },
});

module.exports = User = mongoose.model("usersyself", UserSchema); // takes in model name and schema
