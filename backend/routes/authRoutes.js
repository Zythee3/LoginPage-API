const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");

router.post("/regiter", authController.register);
router.post("/login", authController.login);

module.exports = router;
