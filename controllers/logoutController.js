// Purpose: Logout the user

// Importing the required modules
const response = require('../supporters/response')

exports.logoutController = async (req, res) =>{
    try{
        // Clearing the cookie
        res.clearCookie('dsatoken')

        // Sending the response
        response(res, 200, true, "Logout Successful", null)

    }catch(e){

        // If any error occurs
        console.error(e.message)
        response(res, 500, false, "Internal Server Error")
    }
}