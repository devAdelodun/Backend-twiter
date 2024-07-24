import User from "../models/usersModel.js"
import ash from "express-async-handler"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const signup = ash(async (req, res) => {
    const { username, email, password } = req.body
    if (!username ||!email ||!password) {
        throw new Error("All fields are required")
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new Error("Email already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
        username,
        email,
        password: hashedPassword
    })

    await user.save()
    const token = jwt.sign({ id: user._id }, process.env.JWT)
    
    res.cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24) })
        .status(201)
        .json({ message: "User created successfully" })

})


export const signin = ash(async (req, res) => {
    const { email, password } = req.body
    if (!email ||!password) {
        throw new Error("All fields are required")
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("User not found")
    }

    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) {
        throw new Error("Password is incorrect")
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT)
    res.cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24) })
       .status(200)
       .json({ message: "User signed in successfully" })
})