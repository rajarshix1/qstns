const userModel = require('../models/user.model')
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const  jwt  = require('jsonwebtoken');
const signUp = async (data) => {
    try {
        let existingUser = await userModel.findOne({email: data?.email })
        if(existingUser) throw new Error(`User ${data?.email} already exists`)
        console.log(`user`)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data?.password, salt);
        const newUser = await userModel.create({
            email: data?.email,
            password:hashedPassword,
            image: data?.image,
            name: data?.name
        })
        newUser.password = undefined
        return newUser
    } catch (error) {
        console.log(error)
        return error
    }   
}

const login = async (data) => {
try {
    let existingUser = await userModel.findOne({email: data?.email })
    if(!existingUser) throw new Error(`User not found`)
    if(bcrypt.compare(existingUser.password, data.password)){
        existingUser.password = undefined
        const timeStamp = Date.now();
        const sercret =  process.env.JWTSECRET;
        console.log('sercret', sercret);
        
        const JWT = jwt.sign({
            id: existingUser._id,
            createdAt: timeStamp,
            expiresAt: timeStamp + 1000 * 60 * 60 * 24 * 30,
        },sercret , {expiresIn: "30d"});       
         return {user:existingUser, token: JWT}
    } else{
        throw new Error(`Password mismatch`)
    }
} catch (error) {
    return error
}
}

module.exports = {signUp, login}