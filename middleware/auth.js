const response = require('../supporters/response')
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')
const dotenv = require('dotenv')

dotenv.config()

const auth = async (req, res, next) => {
    try{
        // get token from cookie
        const token = req.cookies.dsatoken;
        
        // check if token exists
        if(!token){
            return response(res, 401, true, "Unauthorized")
        }

        // if token exists, verify it
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // if token is invalid, return
        if(!verifyToken){
            return response(res, 401, true, "Unauthorized")
        }

        // else check if the user with token and email, exist
        const userExist = await User.findOne({email: verifyToken.email, token})
                                    .select('-password');


        if(userExist){
            req.user = userExist;
            next();
        }
        else{
            throw new Error('Unauthorized')
        }

    }catch(e){
     
        console.error(e.message)
        return response(res, 500, true, "Internal Server Error")
    }
}
module.exports = auth