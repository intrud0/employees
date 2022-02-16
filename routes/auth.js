const express = require("express");
const router = express.Router();
const { handleLogin } = require("../controllers/users/authController");

router.post("/", handleLogin);

module.exports = router;
