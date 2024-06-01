const express=require('express');
const { addQuestion } = require('../controllers/question.controller');
const serverResponse = require('../helpers/serverResponse');
const questionRouter = express.Router();
questionRouter.post('/create', async (req, res) => {
    try {
        serverResponse(true, "Success", await addQuestion(req.body), res, 200);
      } catch (error) {
        serverResponse(false, "Error", error?.message, res, 400);
      }
});

module.exports = questionRouter;