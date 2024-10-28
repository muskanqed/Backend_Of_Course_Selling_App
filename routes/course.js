const express = require("express");
const { CourseModel, PurchasesModel } = require("../db");

const Router = express.Router;

const courseRouter = Router();
courseRouter.post("/purchase", (req, res) => {

});

courseRouter.get("/preview", (req, res) => {

});

module.exports = {
    courseRouter
}