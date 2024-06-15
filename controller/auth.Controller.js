const User = require("../models/User")
const bcrypt = require("bcrypt")
const asynchandler = require("express-async-handler")

exports.registerUser = asynchandler(async (req, res) => {
    const { name, email, password } = req.body
    const result = await User.findOne({ email })
    if (result) {
        return res.status(400).json({ message: "Email Already Exists" })
    }
    const x = await bcrypt.hash(req.body.password, 10)
    await User.create({ name, email, password: x })
    res.json({ message: "User Registered Success" })
})
exports.loginUser = asynchandler(async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await User.findOne({ email })
        if (!result) {
            return res.status(400).json({ message: "Email Not Found" })
        }
        const verify = await bcrypt.compare(password, result.password)
        if (!verify) {
            return res.status(400).json({ message: "Password Do Not Match" })
        }
        res.json({ message: "login  Success" })
    } catch (error) {

        res.status(400).json({ message: "Error", error: error.message })
    }
})