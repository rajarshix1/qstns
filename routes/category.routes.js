const express=require('express');
const serverResponse = require('../helpers/serverResponse');
const { getAllCategories , createCategory} = require('../controllers/category.controller');
const categoryRouter = express.Router();
categoryRouter.get('/get-all', async (req, res) => {
    try {
        serverResponse(true, "Success", await getAllCategories, res, 200);
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