// Purpose: To create a response object to be sent back to the client
// Accepts: res, statusCode, success, data, msg
const response = (res, statusCode, success, msg, data=null) => {
    return res.status(statusCode).json({
        statusCode,
        success,
        data,
        msg
    })
}

module.exports = response