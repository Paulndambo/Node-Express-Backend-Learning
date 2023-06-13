const express = require("express");
const router = express.Router();

const { register, login, getUsers } = require("../controllers/auth");

router.post("/register", register) //.post(register)
router.post("/login", login)
router.get("/users", getUsers)

module.exports = router