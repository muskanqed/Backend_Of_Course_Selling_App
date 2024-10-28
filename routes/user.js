const express = require("express");
const { UserModel } = require("../db");

const Router = express.Router;
// const {Router} = require("express");

const userRouter = Router();

userRouter.post("/signup", (req, res) => {
    res.json({
        message: "Hey",
    });
});

userRouter.post("/signin", (req, res) => { });

userRouter.get("/purchases", (req, res) => { });

module.exports = {
    userRouter,
};
