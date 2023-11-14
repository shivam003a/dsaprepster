// Importing Dependencies
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// User Schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    college: {
        type: String
    },
    course: {
        type: String
    },
    branch: {
        type: String
    },
    yop: {
        type: String
    },
    location: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    imageUrl: {
        type: String,
    },
    joinedAt: {
        type: Date,
        default: new Date(Date.now())
    },
    solved: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ],
    token: {
        type: String,
    }
})

// create token
userSchema.methods.createToken = function(){
    const payload = {
        _id: this._id,
        email: this.email,
        role: this.role
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: '72h'
    })
    
    this.token = token
    this.save();

    return token
}

const User = mongoose.model('User', userSchema);
module.exports = User;