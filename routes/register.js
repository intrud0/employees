const express = require("express");
const router = express.Router();
const { handleNewUser } = require("../controllers/users/registerControllers");

router.post("/", handleNewUser);

module.exports = router;
