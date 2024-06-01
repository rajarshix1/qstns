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

module.exports = {getAllCategories, createCategory}