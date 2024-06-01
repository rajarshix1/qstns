const express = require("express");
const serverResponse = require("../helpers/serverResponse");
const { signUp, login, updateUser } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require('multer');
const storage = multer.memoryStorage();
const uploadFile = multer({ storage: storage });
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    serverResponse(true, "Success", await signUp(req.body), res, 200);
  } catch (error) {
    serverResponse(false, "Error", error?.message, res, 400);
  }
});
userRouter.post("/login", async (req, res) => {
  try {
    serverResponse(true, "Success", await login(req.body), res, 200);
  } catch (error) {
    serverResponse(false, "Error", error?.message, res, 400);
  }
});

userRouter.get("/get-user-details", authMiddleware, async (req, res) => {
  try {
    serverResponse(true, "Success", req?.user, res, 200);
  } catch (error) {
    serverResponse(false, "Error", "Not authenticated", res, 400);
  }
});
userRouter.post("/update-user-details", authMiddleware,uploadFile.single('file'), async (req, res) => {
  try {
    serverResponse(true, "Success", await updateUser(req.user, req.body, req.file), res, 200);
  } catch (error) {
    serverResponse(false, "Error", error?.message, res, 400);
  }
});


module.exports = userRouter;
