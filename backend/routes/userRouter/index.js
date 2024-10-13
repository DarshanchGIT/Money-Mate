const express = require("express");
const userRouter = express.Router();
const {
  signUp,
  signIn,
  updateUser,
  bulk,
} = require("../../controller/userControllers/index");
const { usermiddleware } = require("../../middlewares/userMiddleware");

//welcome route
userRouter.get("/", (req, res) => {
  res.send("You are at userRouter");
});

//main end points
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.put("/update", usermiddleware, updateUser);
userRouter.get("/bulk", bulk);

module.exports = userRouter;
