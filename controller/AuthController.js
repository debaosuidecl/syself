const express = require("express");
const queryString = require("query-string");
const User = require("../models/User");
const router = express.Router();
const authMiddleWare = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const passportConf = require("../config/passport-setup");
const config = require("config");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const keys = require("../config/keys");
const passport = require("passport");
const request = require("request");
const passportSetup = require("../config/passport-setup");
const axios = require("axios");
const { UserFindController } = require("../controller/AuthController");
const allCountries = require("../helperLogic/all_countries");
// console.log(allCountries.countryCodes.length);
async function getFacebookUserData(code) {
  return new Promise(async (resolve, reject) => {
    let access_token = "";
    try {
      const { data } = await axios({
        url: "https://graph.facebook.com/v7.0/oauth/access_token",
        method: "get",
        params: {
          fields: ["email"].join(","),
          client_secret: keys.facebook.clientSecret,
          client_id: keys.facebook.clientID,
          code,
          redirect_uri: "http://localhost:2900/api/auth/facebook/redirect",
        },
      });
      // console.log(data, "actual log"); // { id, email, first_name, last_name }
      // return data;
      access_token = data.access_token;
    } catch (error) {
      // console.log(error.response)
      reject(error.response);
    }
    try {
      const { data } = await axios({
        url: "https://graph.facebook.com/me",
        method: "get",
        params: {
          fields: ["id", "email", "first_name", "last_name", "picture"].join(
            ","
          ),
          access_token,
        },
      });
      // console.log(data, "final");
      resolve(data);
    } catch (error) {
      // console.log(error)
      reject(error);
    }
  });
}

module.exports = {
  GetCountryCodes: async (req, res) => {
    console.log(req.body);
    let country = allCountries.countryCodes.find(
      ({ country_code }) => country_code === req.body.country_code
    );
    if (country) {
      res.json({
        country_code: country.dialling_code,
      });
    } else {
      res.status(400).json({
        error: "not found the country",
      });
    }
  },
  UserFindController: async (req, res) => {
    // res.send("auth Route");
    // console.log('here');
    try {
      const user = await User.findById(req.user.id).select("-password");

      // req.user was already stored in the middle ware as the the user payload from the decoded json and the select is used to add or remove properties// in this case -password  removes the password from the user
      res.json(user);
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
    }
  },
  GoogleOAuthController: async (req, res) => {
    console.log("hit here", req.user, "this is the user");
    let googletoken = req.user.token;
    const payload = {
      user: {
        id: req.user._id,
      },
    };

    jwt.sign(payload, config.get("jwtSecret"), null, (error, token) => {
      if (error) throw error;
      console.log("hit here on line 38");
      let redirect = `http://localhost:3000/s-catch?signup-method=google&ctb-rel=${googletoken}&j=${token}&status=${req.user.regComplete}`;
      console.log(redirect);
      res.redirect(redirect);
    });
  },
  FacebookOAuthController: async (req, res) => {
    const stringifiedParams = queryString.stringify({
      client_id: keys.facebook.clientID,
      redirect_uri: "http://localhost:2900/api/auth/facebook/redirect",
      scope: ["email"].join(","), // comma seperated string
      response_type: "code",
      auth_type: "rerequest",
      display: "popup",
    });
    const facebookLoginUrl = `https://www.facebook.com/v7.0/dialog/oauth?${stringifiedParams}`;

    res.redirect(facebookLoginUrl);
    // console.log("hit here",req.user, "this is the user")
    // let fbtoken = req.user.token;
    //     const payload = {
    //       user: {
    //         id: req.user._id
    //       }
    //     };

    //     jwt.sign(payload, config.get('jwtSecret'), null, (error, token) => {
    //       if (error) throw error;
    //       console.log("hit here on line 38")
    //       let redirect = `http://localhost:3000/s-catch?signup-method=facebook&ctb-rel=${fbtoken}&j=${token}`
    //       console.log(redirect)
    //       res.redirect(redirect);
    //     })
  },
  FacebookRedirectSuccess: async (req, res) => {
    console.log("success", req.query);
    try {
      const data = await getFacebookUserData(req.query.code);
      console.log(data);
      const user = await User.findOne({ facebookid: data.id });
      if (user) {
        const payload = {
          user: {
            id: user._id,
          },
        };

        jwt.sign(payload, config.get("jwtSecret"), null, (error, token) => {
          if (error) throw error;
          console.log("hit here on line 38");
          let redirect = `http://localhost:3000/s-catch?signup-method=facebook&ctb-rel=${user.facebookid}&j=${token}&status=${user.regComplete}`;
          console.log(redirect);
          res.redirect(redirect);
        });
      } else {
        let userData = {
          email: data.email,
          lastName: data.last_name,
          firstName: data.first_name,
          avatar: data.picture ? data.picture.data.url : "",
          facebookid: data.id,
          method: "facebook",
          registrationStep: 2,
        };
        let savedValue = {};
        try {
          savedValue = await User(userData).save();
          console.log(savedValue, savedValue._id);
        } catch (error) {
          console.log(error);
          let redirect = `http://localhost:3000/register?facebook-auth-status=fail&status=could-not-create-user`;
          res.redirect(redirect);
        }
        const payload = {
          user: {
            id: savedValue._id,
          },
        };
        jwt.sign(payload, config.get("jwtSecret"), null, (error, token) => {
          if (error) throw error;
          console.log("hit here on line 38");
          let redirect = `http://localhost:3000/s-catch?signup-method=facebook&ctb-rel=${data.id}&j=${token}`;
          console.log(redirect);
          res.redirect(redirect);
        });
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(redirect)
    // res.redirect(redirect)
  },
  LocalAuthController: async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if there are errors
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      // we want to see if the user exist

      // get User's gravatar

      // encrypt the password using bcrypt

      // return a jsonwebtoken so that the user can be logged in immediately

      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already Exists" }] }); //bad request
      }
      // const avatar = gravatar.url(email, {
      //   s: '200', // default size
      //   r: 'pg', // rating - cant have any naked people :)
      //   d: 'mm' // gives a default image
      // });
      user = new User({
        // fullName,
        email,
        // avatar,
        password,
        // registrationStep: 2
      });
      const salt = await bcrypt.genSalt(10); // create the salt
      user.password = await bcrypt.hash(password, salt); // to encrypt the user password

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecret"), null, (error, token) => {
        if (error) throw error;

        res.json({ token, registrationStep: 2 });
      });
    } catch (e) {
      console.error(e);
      res.status(500).send("Server Error");
    }
  },
  SignInControllerLocal: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      // we want to check to see if there is no user. if there isn't we send an error

      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Incorrect email or password entered." }] }); //bad request
      }

      console.log(user);

      if (user.method == "google" || user.method == "facebook")
        return res.status(400).json({
          errors: [
            {
              msg: "Email currently in use with different sign in method",
            },
          ],
        });
      const isMatch = await bcrypt.compare(password, user.password); // first arg is plain text password from request, second is the encrypted password, we want to check if these 2 match

      if (!isMatch) {
        // if it doesn't match
        return res
          .status(400)
          .json({ errors: [{ msg: "Incorrect email or password entered. " }] }); //bad request
      }
      console.log("just about");

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecret"), null, (error, token) => {
        if (error) throw error;

        res.json({
          token,
          email: user.email,
          regComplete: user.regComplete,

          // fullName: user.fullName,
          _id: user.id,
        });
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        errors: [
          {
            msg: "A server error occured",
          },
        ],
      });
    }
  },
  finalRegController: async (req, res) => {
    // console.log("hit");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if there are errors
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { phoneNumber, userName, firstName, lastName, location } = req.body;
    console.log(
      req.user.id,
      phoneNumber,
      userName,
      firstName,
      lastName,
      location
    );

    try {
      const user = await User.findOne({ userName });
      console.log(user);
      if (user)
        return res.status(500).json({
          errors: [
            {
              msg: "the username already exists",
            },
          ],
        });
    } catch (error) {
      console.log(error);
    }
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        console.log(user);
        if (user.method == "goolgle" || user.method == "facebook") {
          user.location = location;
          user.phone = phoneNumber;
          user.regComplete = true;
          user.userName = userName;
        } else {
          user.firstName = firstName;
          user.lastName = lastName;
          user.location = location;
          user.userName = userName;
          user.phone = phoneNumber;
          user.regComplete = true;
        }

        await user.save();
        res.json({
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errors: [
          {
            msg: "Server error",
          },
        ],
      });
    }
  },
};
