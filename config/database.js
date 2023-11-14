const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("Connected to database")
    }).catch((e) => {
        console.error(e.message)
    })
}

module.exports = connectDB