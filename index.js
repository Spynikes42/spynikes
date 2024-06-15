const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
mongoose.connect(process.env.MONGO_URL)

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/auth", require("./routes/auth.Route"))

app.use("*", (req, res) => {
    res.status(400).json({ message: "Resuorce Not Found" })
})
app.use((err, req, res, next) => {
    res.status(500).json({ message: "Server Error", error: err.message })
})
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})