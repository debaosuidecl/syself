const express = require("express");
const router = express.Router();

const {
  FindUniqueUserName,
  CheckUniquePhone,
} = require("../../controller/UserController");

//verify unique username
router.get("/unique-username", FindUniqueUserName);
router.get("/check-unique-phone", CheckUniquePhone);

module.exports = router;
