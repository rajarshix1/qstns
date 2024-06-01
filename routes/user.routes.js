const express = require("express");
const serverResponse = require("../helpers/serverResponse");
const { signUp, login } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require('multer');
const storage = multer.memoryStorage();
const uploadFile = multer({ storage: storage });
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    serverResponse(true, "Success", await signUp(req.body), res, 202);
  } catch (error) {
    serverResponse(false, "Error", error?.message, res, 400);
  }
});
userRouter.post("/login", async (req, res) => {
  try {
    serverResponse(true, "Success", await login(req.body), res, 202);
  } catch (error) {
    serverResponse(false, "Error", error?.message, res, 400);
  }
});

userRouter.get("/get-user-details", authMiddleware, async (req, res) => {
  try {
    serverResponse(true, "Success", req?.user, res, 202);
  } catch (error) {
    serverResponse(false, "Error", "Not authenticated", res, 400);
  }
});


module.exports = userRouter;
