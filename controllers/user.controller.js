const userModel = require('../models/user.model')
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const  jwt  = require('jsonwebtoken');
const awsUpload = require('../helpers/awsUpload');
///////////FOR SIGNING UP///////
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
        throw error
    }   
}

/////////////LOG IN/////////////
const login = async (data) => {
try {
    let existingUser = await userModel.findOne({email: data?.email })
    if(!existingUser) throw new Error(`User not found`)
    const passMatch = await bcrypt.compare(data.password,existingUser.password )
    if(passMatch){
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
    throw error
}
}

/////////////FOR UPDATING USER'S DETAILS(PASSWORD NOT INCLUDED) /////////////
const updateUser = async(user, data, file) => {
    try {
        console.log(Object.keys(data).length)
        if(Object.keys(data).length===0 && !file)  throw new Error("No data provided")
        const updateQuery = {}
        if(data.name) updateQuery.name = data.name
        if(file) {
            const fileUrl = await awsUpload(file)
            console.log(fileUrl)
            updateQuery.image = fileUrl
        }
        const updated = await userModel.findByIdAndUpdate(user._id, updateQuery, {new:true})
        updated.password = undefined
        return updated
    } catch (error) {
        throw error
    }
}
module.exports = {signUp, login, updateUser}