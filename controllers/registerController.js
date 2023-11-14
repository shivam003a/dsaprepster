// Purpose: Register Controller

// Importing Dependencies
const response = require('../supporters/response')
const User = require('../models/userSchema')
const bcrypt = require('bcrypt')

exports.registerController = async (req, res) => {
    try {
        // get data from req.body
        const { fullname, email, password, role } = req.body

        // check if all details are filled
        if (!fullname || !email || !password) {
            return response(res, 400, false, "All fields are required")
        }

        // check if user already exists
        const userExists = await User.findOne({ email })

        // if user exists, return error
        if (userExists) {
            return response(res, 400, false, "User already exists")
        }

        // password hashing
        let hashedPassword
        try {
            const salt = await bcrypt.genSalt(10)
            hashedPassword = await bcrypt.hash(password, salt)

        } catch (e) {
            console.error(e.message)
            return response(res, 500, true, "Internal Server Error")
        }

        // if user does not exist, create user
        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            role
        })

        // return success message
        user.password = undefined // remove password from response
        response(res, 200, true, "User created successfully", user);

    } catch (e) {

        console.log(e.message)
        response(res, 500, true, "Internal Server Error")
    }
}