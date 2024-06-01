const { default: mongoose } = require("mongoose")
const categoryModel = require("../models/category.model")

const getAllCategories = async ()=>{
    const allCategories = await categoryModel.find({})
    return allCategories
}
const createCategory = async (data)=>{
    const existing = await categoryModel.findOne({name: data.name})
    if(existing) throw ({message: "Category already exists"})
    const newCategory = await categoryModel.create({
        name: data.name,
    })
    return newCategory
}

const oneCategoryWithQuestions = async (data)=>{
    try {
        
        let matchStage 
        if( data._id ) matchStage = {$match: {_id: new mongoose.Types.ObjectId(data._id)}}
        else if( data.name ) matchStage = {$match: {name: data.name}}
        else throw new Error ("Invalid id or name provided")
        console.log(matchStage)
        const categories = await categoryModel.aggregate([
            matchStage,
            {   
                $lookup: {
                    from: "questions",
                    localField: "_id",
                    foreignField: "categoryIds",
                    as: "questions"
                }
            }
        ])
        return categories
    } catch (error) {
        throw error
    }
}
const allCategoriesWithQuestions = async ()=>{
    const categories = await categoryModel.aggregate([
        {
            $lookup: {
                from: "questions",
                localField: "_id",
                foreignField: "categoryIds",
                as: "questions"
            }
        }
    ])
    return categories
}

module.exports = {getAllCategories, createCategory,allCategoriesWithQuestions, oneCategoryWithQuestions}