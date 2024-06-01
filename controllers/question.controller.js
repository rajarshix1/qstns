const categoryModel = require("../models/category.model");
const questionModel = require("../models/question.model");
const csv = require("csv-parser");
const { Readable } = require("stream");

////FOR ADDING A SINGLE QUESTION. FOR TESTING PURPOSES/////////////
const addQuestion = async (data) => {
  console.log("dddata", data);
  try {
    const categoryPromises = data?.categoryNames?.map(async (cat) => {
      const category = await categoryModel.findOne({ name: cat });
      if (category) return category._id;
      else {
        const category = await categoryModel.create({ name: cat });
        return category._id
      }
    });

    const categoryIds = (await Promise.all(categoryPromises)).filter(
      (id) => id !== null
    );
    console.log(categoryIds);
    const newQuestion = await questionModel.create({
      qstn: data?.qstn,
      answer: data?.answer,
      categoryIds: categoryIds,
    });
    await Promise.all(
      categoryIds.map(async (categoryId) => {
        await categoryModel.findByIdAndUpdate(categoryId, {
          $inc: { questionCount: 1 },
        });
      })
    );
    return newQuestion;
  } catch (error) {
    throw error;
  }
};

////ADD QUESTIONS FROM CSV. USES addQuestionsInBulk function///////////////////
const addQuestionsFromCSV = async (file) => {
  try {
    const questions = [];
    console.log("file", file);
  
    return new Promise((resolve, reject) => {
      const stream = Readable.from(file.buffer);
  
      stream
        .pipe(csv())
        .on("data", (row) => {
          // console.log(row)
          const categories = row.categories
            ? row.categories.split(",").map((cat) => cat.trim())
            : [];
          questions.push({
            qstn: row.qstn,
            answer: row.answer,
            categoryNames: categories,
          });
        })
        .on("end", async () => {
          console.log(questions);
          try {
            await addQuestionsInBulk(questions);
            resolve("Questions added successfully");
          } catch (error) {
            reject(error);
          }
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  } catch (error) {
    throw error
  }
};

////FOR ADDING QUESTIONS AND CATEGORIES IN BULK FROM CSV. //////

const addQuestionsInBulk = async (data) => {
    try {
      const allCategoryNames = new Set();
      data.forEach((obj) => {
        obj.categoryNames.forEach((cat) => allCategoryNames.add(cat));
      });
      const categoryNamesArr =  Array.from(allCategoryNames)

      const categories = await Promise.all(
        categoryNamesArr.map(async (cat) => {
            const category = await categoryModel.findOne({ name: cat });
            if (category) return category;
            else {
              const category = await categoryModel.create({ name: cat });
              return category
            }
        })
      );
      console.log(categories, categoryNamesArr);

        const newQuestions = data.map((obj) => ({
        qstn: obj.qstn,
        answer: obj.answer,
        categoryIds: obj.categoryNames.map((catName) =>
          categories.find((cat) => cat.name === catName)._id
        ),
      }));
  
      const insertedQuestions = await questionModel.insertMany(newQuestions);
      console.log("Inserted" , insertedQuestions);
      categories.map(async (category) => {
          const count = insertedQuestions.reduce(
            (total, question) =>
              total + (question.categoryIds.includes(category._id) ? 1 : 0),
            0
          );
          await categoryModel.findByIdAndUpdate(category._id, {
            $inc: { questionCount: count },
          });
        })

  
      return insertedQuestions;
    } catch (error) {
      throw error;
    }
  };
module.exports = { addQuestion, addQuestionsFromCSV };
