// Purpose: To get the profile of the user

// Importing Dependencies
const response = require("../supporters/response")
const User = require("../models/userSchema")

exports.getProfile = async (req, res) => {
    try {
        // Getting the id from the params
        const id = req.params.id

        // Checking if the id exists
        const idExists = await User.findById(id)

        // If the id doesn't exists
        if(!idExists){
            return response(res, 404, false, "User not found")
        }

        // if the id exists
        // Finding the user by id
        const profile = await User.findById(id).
                                    select("-password").
                                    select("-token").
                                    populate("solved").
                                    exec()

        // Sending the response
        response(res, 200, true, "Profile fetched successfully", profile)

    } catch (e) {

        // If any error occurs
        console.log(e.message)
        response(res, 500, false, "Internal Server Error")
    }
}