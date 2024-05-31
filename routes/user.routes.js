const express=require('express');
const serverResponse = require('../helpers/serverResponse');
const { signUp } = require('../controllers/user.controller');
const usersRouter = express.Router();
usersRouter.post('/register', async (req, res) => {
     serverResponse(true,"ok", await signUp(req.body), res, 202);
});

module.exports = usersRouter;