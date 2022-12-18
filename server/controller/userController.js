import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/userModel.js"

export const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userEmailExists = await User.findOne({ where: { email } })

    if (userEmailExists) {
        res.status(400)
        throw new Error("Email Exists")
    }

    if (!email || !password) {
        res.status(400)
        throw new Error("Please Fill Up All Fields")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const createdUser = await User.create({
        email: email,
        password: hashedPassword
    })

    res.status(200)
    res.json({
        createdUser
    })
})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
        res.status(400)
        throw new Error("User Doesn't Exists")
    }

    const comparePassword = await bcrypt.compare(password, user.password)

    if (user && comparePassword) {
        res.status(201).json({
            id: user.userID,
            email: user.email,
            token: generateToken(user.userID),
        })
    } else {
        res.status(400)
        throw new Error("Invalid Credentials")
    }

})

export const getMe = asyncHandler(async (req, res) => {
    const { userID, email } = await User.findByPk(req.user.userID)

    res.status(200).json({
        userID,
        email
    })

})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}