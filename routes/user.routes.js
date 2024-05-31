const express = require("express");
const serverResponse = require("../helpers/serverResponse");
const { signUp, login } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");
const usersRouter = express.Router();
usersRouter.post("/register", async (req, res) => {
  try {
    serverResponse(true, "Success", await signUp(req.body), res, 202);
  } catch (error) {
    serverResponse(false, "Error", error?.message, res, 400);
  }
});
usersRouter.post("/login", async (req, res) => {
  try {
    serverResponse(true, "Success", await login(req.body), res, 202);
  } catch (error) {
    serverResponse(false, "Error", error?.message, res, 400);
  }
});

usersRouter.get("/get-user-details", authMiddleware, async (req, res) => {
  try {
    serverResponse(true, "Success", req?.user, res, 202);
  } catch (error) {
    serverResponse(false, "Error", "Not authenticated", res, 400);
  }
});
module.exports = usersRouter;
