//  Importing Dependencies
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const cloudinary = require('cloudinary').v2
const multer = require('multer')
require('dotenv').config()
const User = require('../models/userSchema')

// Importing Controllers
const { registerController } = require('../controllers/registerController')
const { loginController } = require('../controllers/loginController')
const { getQuestions } = require('../controllers/getQuestions')
const { getProfile } = require('../controllers/getProfile')
const { uploadQuestions } = require('../controllers/uploadQuestions')
const { markQuestion } = require('../controllers/markQuestion')
const { logoutController } = require('../controllers/logoutController')
const { getQuestionByTopic } = require('../controllers/getQuestionByTopic')
const { updateProfile } = require('../controllers/updateProfile')
const { getSolved } = require('../controllers/getSolved')
const response = require('../supporters/response')
const { getUserId } = require('../controllers/getUserId')


// setting up cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// instantiating multer with destination as uploads folder
const upload = multer({ dest: "./uploads/" })


// Routes
router.post('/register', registerController)
router.post('/login', loginController)
router.get('/get-questions', auth, getQuestions)
router.get('/get-questions/:topic', auth, getQuestionByTopic)
router.get('/get-profile/:id', auth, getProfile)
router.put('/update-profile', auth, updateProfile)
router.post('/upload-question', auth, uploadQuestions)
router.put('/mark-solved/:id', auth, markQuestion)
router.get('/get-user-id', auth, getUserId)
router.get('/get-solved', auth, getSolved)
router.get('/logout', auth, logoutController)


router.post('/upload-profile-pic', auth, upload.single('image'), async (req, res) => {
    try {
        // fetching mail of loggedin user
        const email = req.user.email

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "dsaprep-profile-pic"
        });

        // Getting image url
        const imageUrl = result.secure_url

        await User.findOneAndUpdate({ email }, { imageUrl }, { new: true })
        response(res, 200, true, "Profile Pic Uploaded", imageUrl)

    } catch (e) {
        console.error(e.message)
        response(res, 500, false, "Internal Server Error")
    }
})

module.exports = router