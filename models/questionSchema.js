const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    dificulty: {
        type: String,
        required: true,
        enum: ['Basic', 'Easy', 'Medium', 'Hard'],
        default: 'easy'
    },
    link: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    }
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;