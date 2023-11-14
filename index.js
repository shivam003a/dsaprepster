// Importing Dependencies
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const response = require('./supporters/response')
const connectDB = require('./config/database')
var path = require('path')

// Instantiating Express
const app = express()

// Middleware
app.use(express.json())
app.use(cors({
    origin: '*'
}))
dotenv.config()
app.use(cookieParser())

// Port
const PORT = process.env.PORT || 5000

// Database Connection
connectDB()

// serving the frontend
app.use(express.static(path.join(__dirname, './client/build')))
app.get("*", function(_, res){
    res.sendFile(
        path.join(__dirname, './client/build/index.html'),
        function(err){
            res.status(500).send(err)
        }
    )
})

// Routes
app.use('/api/v1', require('./routes/router'))

// Listening to port
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})