const express = require("express");
const routes = express.Router();

const userRouter = require("./userRouter/index");
const accountRouter = require("./accountRouter/index");

routes.use("/user", userRouter);
routes.use("/account", accountRouter);

module.exports = routes;
