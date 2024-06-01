const categoryModel = require("../models/category.model");
const questionModel = require("../models/question.model")

const addQuestion = async (data) => {
    try {
        const categoryPromises = data.categoryNames.map(async (cat) => {
            const category = await categoryModel.findOne({ name: cat });
            if (category) return category._id 
            else return null;
        });

        const categoryIds = (await Promise.all(categoryPromises)).filter(id => id !== null);
        console.log(categoryIds)
       
    } catch (error) {
        throw error;
    }
};

module.exports={addQuestion}