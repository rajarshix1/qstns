const serverResponse = (success, message, data, res, status) =>{
    if (!success) return res.status(status).json({
        success: false,
        message,
        error: data
    });
    else return res.status(status).json({
        success: true,
        message,
        data,
    });
}
module.exports = serverResponse