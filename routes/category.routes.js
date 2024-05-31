const express=require('express')
const categoryRouter = express.Router();
categoryRouter.get('/', async (req, res) => {
    res.send('categories');
});

module.exports = categoryRouter;