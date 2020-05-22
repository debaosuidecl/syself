const GooglePlusTokenStrategy = require("passport-google-oauth").OAuth2Strategy;
const passport = require("passport");
// const facebookStragZZZ
// const keys = require("./keys")

const googleClientID = process.env.googleClientID;
const googleSecret = process.env.googleSecret;

// const googleClientID = process.env.googleClientID
const connectDB = require("./db");
const User = require("../models/User");
// connectDB()
// passport.serializeUser(function(user, done) {
//     done(null, user);
//    });

// passport.deserializeUser(function(user, done) {
//     done(null, user);
//    });
// GOOGLE OAUTH STRATEGY

passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleSecret,
      callbackURL: "/api/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log('accessToken', accessToken)
      // console.log('refreshToken', refreshToken)
      // console.log('profile', profile)

      // CHECK IF USER ALREADY EXISTS IN DB
      const user = await User.findOne({ googleId: profile.id }).lean();

      if (user) {
        console.log("current user is ", user);

        done(null, { ...user, token: accessToken });
        // return
      } else {
        var userData = {
          email: profile.emails[0].value,
          lastName: profile.name.familyName,
          firstName: profile.name.givenName,
          avatar: profile.photos[0].value || "",
          googleId: profile.id,
          method: "google",
          token: accessToken,
        };

        let userToSave = new User(userData);

        userToSave
          .save()
          .then((res) => {
            console.log("user created", res);
            done(null, res);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  )
);
