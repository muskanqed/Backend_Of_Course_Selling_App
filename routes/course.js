const express = require("express");
const Router = express.Router;

const courseRoute = Router();
courseRoute.post("/courses/purchase", (req, res) => {

});

courseRoute.get("/courses", (req, res) => {

});

module.exports = {
    courseRoute
}