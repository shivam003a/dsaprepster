const User = require('../models/userSchema')
const response = require('../supporters/response')

exports.getUserId = async (req, res) => {
    try {

        const email = req.user.email
        const user = await User.findOne({ email }).select('_id')
        if (!user) {
            response(res, 400, false, "User not found", null)
        }

        response(res, 200, true, "User found", user)

    } catch (err) {
        console.log(err)
        response(res, 500, false, "Some error occured", null)
    }
}