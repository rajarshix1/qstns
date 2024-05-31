const express=require('express')
const questionRouter = express.Router();
questionRouter.get('/', async (req, res) => {
    res.send('qstn');
});

module.exports = questionRouter;