const express=require('express');
const serverResponse = require('../helpers/serverResponse');
const usersRouter = express.Router();
usersRouter.get('/', async (req, res) => {
    serverResponse(true,"ok", "data", res, 202);
});

module.exports = usersRouter;