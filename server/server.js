import express from "express"
import dotenv from "dotenv"
import colors from "colors"

import { connectDB } from "./config/db.js"
import thoughtRouter from "./routes/thoughtRoutes.js"
import userRouter from "./routes/userRoutes.js"
import { errorHandler } from "./middleware/handler/errorHandler.js"


dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

// utilizing express middleware
app.use(express.urlencoded({
    extended: false
}))

// utilizing routes
app.use("/api/thoughts", thoughtRouter)
app.use("/api/user", userRouter)

// utilizing a middleware
app.use(errorHandler)

app.get("/", (req, res) => {
    res.json({
        message: "Welcome To Thoughts"
    })
})

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Listening @ Port: ${PORT}`.blue)
        connectDB()
    }
})