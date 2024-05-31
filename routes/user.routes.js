const express=require('express');
const serverResponse = require('../helpers/serverResponse');
const { signUp, login } = require('../controllers/user.controller');
const usersRouter = express.Router();
usersRouter.post('/register', async (req, res) => {
     serverResponse(true,"ok", await signUp(req.body), res, 202);
});
usersRouter.post('/login', async (req, res) => {
     serverResponse(true,"ok", await login(req.body), res, 202);
});

module.exports = usersRouter;