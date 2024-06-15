const { loginUser, registerUser } = require("../controller/auth.Controller")

const router = require("express").Router()

router
    .post("/login", loginUser)
    .post("/register", registerUser)

module.exports = router