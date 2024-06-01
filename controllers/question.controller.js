const categoryModel = require("../models/category.model");
const questionModel = require("../models/question.model");
const csv = require("csv-parser");
const { Readable } = require("stream");
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
const addQuestionsFromCSV = async (file) => {
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
          for (const question of questions) {
            await addQuestion(question);
          }
          resolve("Questions added successfully");
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

module.exports = { addQuestion, addQuestionsFromCSV };
