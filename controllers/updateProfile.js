const response = require('../supporters/response')
const User = require('../models/userSchema')

exports.updateProfile = async (req, res) => {
    try{
        // Getting the user id from the request
        const id = req.user._id

        // Getting the data from the request
        const { college, course, branch, yop, location } = req.body

        // Validating the data
        if(!college || !course || !branch || !yop || !location){
            return response(res, 400, false, "Please fill all the fields")
        }

        // Updating the profile
        const updatedProfile = await User.findByIdAndUpdate(id, { college, course, branch, yop, location }, {
                                        new: true
                                        }).
                                        select('-password -token')

        // Sending the response
        response(res, 200, true, "Profile Updated Successfully", updatedProfile)

    }catch(e){

        // If any error occurs
        console.error(e.message)
        response(res, 500, false, "Internal Server Error")
    }
}