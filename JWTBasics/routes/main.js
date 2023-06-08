const express = require("express");
const router = express.Router();

const authWrapper = require("../middleware/auth");

const { login, dashboard } = require("../controllers/main");


router.route("/dashboard").get(authWrapper, dashboard);
router.route("/login").post(login);

module.exports = router