const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const authMiddleWare = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const passportConf = require("../../config/passport-setup");
const config = require("config");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const passport = require("passport");
const passportSetup = require("../../config/passport-setup");
const {
  UserFindController,
  GoogleOAuthController,
  GetCountryCodes,
  FacebookOAuthController,
  FacebookRedirectSuccess,
  LocalAuthController,
  finalRegController,
  SignInControllerLocal,
  GoogleMobileAuth,
  FacebookMobileAuth,
} = require("../../controller/AuthController");
//@route    GET api/auth
//@desc     test Route
//@access   public

router.get("/", authMiddleWare, UserFindController);
router.post("/get_ip", GetCountryCodes);
//@route    POST api/auth
//@desc     Authenticate user & get token
//@access   public
router.post(
  "/signin-local",
  [
    check("email", "Use a valid Email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  SignInControllerLocal
);
// login with facebook for mobile
router.get("/facebook-mobile-auth", FacebookMobileAuth);
router.get("/google-mobile-auth", GoogleMobileAuth);
router.get(
  "/oauth/google",
  passport.authenticate("googleToken", { scope: ["profile", "email"] })
);
router.get("/facebook", FacebookOAuthController);
router.get("/facebook/redirect", FacebookRedirectSuccess);
router.get(
  "/google/redirect",
  passport.authenticate("googleToken", {
    failureRedirect: "/",
    session: false,
  }),
  GoogleOAuthController
);
// final registration step
// protected
router.post(
  "/final-reg-step",
  authMiddleWare,
  [
    check("firstName", "The first name is required")
      .not()
      .isEmpty()
      .isLength({ min: 2 }),
    check("lastName", "The last name is required")
      .not()
      .isEmpty()
      .isLength({ min: 2 }),
    check("userName", "The user name is required")
      .not()
      .isEmpty()
      .isLength({ min: 2 }),
    check("location", "The location is required")
      .not()
      .isEmpty()
      .isLength({ min: 2 }),
    check("phoneNumber", "The phone number is required")
      .not()
      .isEmpty()
      .isLength({ min: 10 })
      .isNumeric(),
  ],
  finalRegController
);
router.post(
  "/local",
  [
    check("email", "Use a valid Email").isEmail(),
    check(
      "password",
      "Please Enter a password with 6 or more characters"
    ).isLength({ min: 8 }),
  ],
  LocalAuthController
);

module.exports = router;
