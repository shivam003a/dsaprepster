// Purpose: To handle login requests

// Importing Dependencies
const response = require('../supporters/response')
const User = require('../models/userSchema')
const bcrypt = require('bcrypt')

exports.loginController = async (req, res) => {
    try {
        // get data from req.body
        const { email, password } = req.body

        // check if all details are filled
        if(!email || !password) {
            return response(res, 400, false, "Input Cannot Be Blank")
        }

        // check if user exists
        const userExists = await User.findOne({ email })

        // if user does not exist, return error
        if(!userExists) {
            return response(res, 400, false, "User Does Not Exist")
        }

        // check if password is correct
        const verifyPassword = await bcrypt.compare(password, userExists.password)

        // if password is incorrect, return error
        if(!verifyPassword) {
            return response(res, 400, false, "Password Incorrect")
        }

        // Now password is correct, create token
        const token = userExists.createToken()

        // store token in cookie
        res.clearCookie('dsatoken')
        res.cookie('dsatoken', token, {
            expires: new Date(Date.now() + 259200000),
        })
        
        // return success message
        response(res, 200, true, "Login Successful", userExists)

    } catch (e) {

        // If any error occurs
        console.error(e.message);
        response(res, 500, true, "Internal Server Error")
    }
}