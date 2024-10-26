const express = require("express");
const Router = express.Router;
// const {Router} = require("express");

const userRoute = Router();

userRoute.post("/user/signup", (req, res) => {});

userRoute.post("/user/signin", (req, res) => {});

userRoute.get("/user/purchases", (req, res) => {});

module.exports = {
  userRoute,
};
