// Purpose: Mark a question as solved

// Importing Dependencies
const response = require('../supporters/response');
const User = require('../models/userSchema');
const Question = require('../models/questionSchema');

exports.markQuestion = async (req, res) => {
    try {
        // Getting the id from the params
        const id = req.params.id

        // Getting the email from the user
        const email = req.user.email

        // Checking if the id exists
        const idExists = await Question.findById(id)

        // If id does not exist, return error
        if (!idExists) {
            return response(res, 400, false, 'Question does not exist', null)
        }

        // Checking if the question is already solved
        const isSolved = await User.findOne({ email, solved: id })

        let updatedSolved
        if (isSolved) {
            // if question is already solved then remove it from the solved array
            updatedSolved = await User.findOneAndUpdate({ email },
                { $pull: { solved: id } },
                { new: true }).select('-password').select('-token')

            response(res, 200, true, 'Question marked as unsolved', updatedSolved)
        }
        else {
            // if question is not solved then add it to the solved array
            updatedSolved = await User.findOneAndUpdate({ email },
                { $push: { solved: id } },
                { new: true }).select('-password').select('-token')
                
            response(res, 200, true, 'Question marked as solved', updatedSolved)
            }

        // Updating the solved array
        // Sending the response

    } catch (e) {

        // If any error occurs
        console.log(e.message)
        response(res, 500, false, e.message, null)
    }
}