// Purpose: Upload questions to the database by the admin

// Importing Dependencies
const response = require('../supporters/response')
const Question = require('../models/questionSchema')

exports.uploadQuestions = async (req, res) => {
    try {
        // Getting the data from the body
        const { question, dificulty, link, topic } = req.body

        // Getting the role from the user
        const { role } = req.user

        // Checking if all the fields are filled
        if (!question || !dificulty || !link || !topic) {
            return response(res, 400, false, 'Please fill all the fields')
        }

        // Checking if the user is admin
        if (role === 'admin') {
            const newQuestion = await Question.create({
                question,
                dificulty,
                link,
                topic
            })
            return response(res, 200, true, 'Question uploaded successfully', newQuestion)

        } else {
            // If the user is not admin
            return response(res, 400, false, 'You are not authorized to upload questions')
        }

    } catch (e) {

        // If any error occurs
        console.log(e.message)
        response(res, 500, false, 'Internal server error')
    }
}