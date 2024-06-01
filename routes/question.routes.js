const express=require('express');
const { addQuestion, addQuestionsFromCSV } = require('../controllers/question.controller');
const serverResponse = require('../helpers/serverResponse');
const questionRouter = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const uploadFile = multer({ storage: storage });
questionRouter.post('/create', async (req, res) => {
    try {
        serverResponse(true, "Success", await addQuestion(req.body), res, 200);
      } catch (error) {
        serverResponse(false, "Error", error?.message, res, 400);
      }
});
questionRouter.post("/add-from-csv", uploadFile.single("file"), async (req, res) => {
    try {
        console.log("file", req.file)
        
        serverResponse(true, "Success", await addQuestionsFromCSV(req.file), res, 202);
      } catch (error) {
        serverResponse(false, "Error", error.message, res, 400);
      }
})
module.exports = questionRouter;