const express = require("express");
const { usermiddleware } = require("../../middlewares/userMiddleware");
const { getBalance, transferFund } = require("../../controller/accountControllers");
const accountRouter = express.Router();

//welcome route
accountRouter.get("/", (req, res) => {
  res.send("You are at account Router");
});

//main end points
accountRouter.get("/balance", usermiddleware, getBalance);
accountRouter.post("/transfer", usermiddleware, transferFund);


module.exports = accountRouter;
