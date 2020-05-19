const User = require("../models/User");

module.exports = {
  FindUniqueUserName: async (req, res) => {
    // res.send("auth Route");
    // console.log('here');
    console.log(req.query);
    try {
      const user = await User.findOne({ userName: req.query.username }).select(
        "-password"
      );
      if (user) {
        res.json({
          unique: false,
        });
      } else {
        res.json({
          unique: true,
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
    }
  },
  CheckUniquePhone: async (req, res) => {
    // res.send("auth Route");
    // console.log('here');
    console.log(req.query);
    try {
      const user = await User.findOne({ phone: req.query.phone }).select(
        "-password"
      );
      if (user) {
        if (user.location == req.query.location) {
          res.json({
            unique: false,
          });
        } else {
          res.json({
            unique: true,
          });
        }
      } else {
        res.json({
          unique: true,
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
    }
  },
};
