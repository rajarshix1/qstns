const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const serverResponse = require('../helpers/serverResponse');
const authMiddleware = async (req, res, next) => {
    try {
        const token = req?.headers['access-token'];
        console.log('token', token);
        if (!token) throw new Error ("token not found");
        const secret = process.env.JWTSECRET;
        const data = jwt.verify(token, secret);
        const {id, expiresAt} = data;  
        console.log(data)
        const timeStamp = Date.now();
        console.log(timeStamp)
        if (timeStamp > expiresAt) throw new Error( { message: "Token expired" })
        let user = await userModel.findById(id)
        if(!user) throw new Error ("No user found")
        user.password == undefined
        req.user = user;
        next();
    } catch (error) {
        console.log('error', error)
        serverResponse(false, "Unauthorized", error, res,400)
    }
  }

  module.exports = authMiddleware;