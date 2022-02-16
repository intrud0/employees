const express = require("express");
const router = express.Router();
const { handleLogout } = require("../controllers/users/logoutController");

router.get("/", handleLogout);

module.exports = router;
