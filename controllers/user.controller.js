import userModel from "../models/user.model";

const mongoose = require("mongoose");

const signUp = async (data) => {
    try {
        let existingUser = await userModel.findOne({email: data.email })
        if(existingUser) throw new Error(`User ${data.email} already exists`)
        console.log(`user`)
    } catch (error) {
        console.log(error)
    }   
}
