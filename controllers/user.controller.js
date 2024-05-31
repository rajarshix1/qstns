const userModel = require('../models/user.model')
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
    }   
}
module.exports = {signUp}