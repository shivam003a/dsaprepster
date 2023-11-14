const User = require("../models/userSchema")
const response = require("../supporters/response")

exports.getSolved = async (req, res)=>{
    try{
        // fetching mail of loggedin user
        const email = req.user.email

        // fetching solved questions of loggedin user
        const solved = await User.findOne({email}).select('solved')

        // sending response
        response(res, 200, true, "Solved Questions", solved)

    }catch(e){
        console.error(e.message)
        response(res, 500, false, "Internal Server Error", null)
    }
}