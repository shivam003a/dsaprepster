// Purpose: To get all the questions from the database

// Importing the required modules
const Question = require("../models/questionSchema");
const response = require("../supporters/response");

exports.getQuestions = async (req, res) => {
    try{
        // Fetching all the questions
        const questions = await Question.find();

        // Sending the response
        response(res, 200, true, "Questions fetched successfully", questions);

    }catch(e){

        // If any error occurs
        console.error(e.message)
        response(res, 500, false, "Internal Server Error")
    }
}