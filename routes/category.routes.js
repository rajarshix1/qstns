const express=require('express');
const serverResponse = require('../helpers/serverResponse');
const { getAllCategories , createCategory,allCategoriesWithQuestions,oneCategoryWithQuestions} = require('../controllers/category.controller');
const categoryRouter = express.Router();
categoryRouter.get('/get-all', async (req, res) => {
    try {
        serverResponse(true, "Success", await getAllCategories(), res, 200);
      } catch (error) {
        serverResponse(false, "Error", error?.message, res, 400);
      }});
categoryRouter.get('/get-all-with-qstn', async (req, res) => {
    try {
        serverResponse(true, "Success", await allCategoriesWithQuestions(), res, 200);
      } catch (error) {
        serverResponse(false, "Error", error?.message, res, 400);
      }});
categoryRouter.get('/get-one-with-qstn', async (req, res) => {
    try {
        serverResponse(true, "Success", await oneCategoryWithQuestions(req.query), res, 200);
      } catch (error) {
        serverResponse(false, "Error", error?.message, res, 400);
      }});
categoryRouter.post('/create', async (req, res) => {
    try {
        serverResponse(true, "Success", await createCategory(req.body), res, 200);
      } catch (error) {
        serverResponse(false, "Error", error?.message, res, 400);
      }});

module.exports = categoryRouter;