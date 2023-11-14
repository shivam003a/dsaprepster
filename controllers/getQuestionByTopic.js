// Purpose: To get the questions by topic
// it can also be used to filter the questions by difficulty just instead of topic use difficulty as the parameter

// Importing Dependencies
const response = require('../supporters/response')
const Question = require('../models/questionSchema')

exports.getQuestionByTopic = async (req, res) => {
    try{
        // Getting the topic from the request
        const topic = req.params.topic

        // Getting the questions from the database
        const questions = await Question.find({topic})

        // Sending the response
        response(res, 200, true, "Questions By Category Fetched", questions)

    }catch(e){

        // If any error occurs
        console.error(e.message)
        response(res, 500, false, "Internal Server Error")
    }
}