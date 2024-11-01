const express = require("express");
const { courseModel, purchaseModel } = require("../db");
const { userMiddleware } = require("../middleware/user")

const Router = express.Router;

const courseRouter = Router();
courseRouter.post("/purchase", userMiddleware, async (req, res) => {
    const userId = req.userid;
    const courseId = req.body.couserId;

    const purchase = await courseModel.find({
        courseId
    })

    if (!purchase) {
        return res.json({
            message: "Provide a vaild couser id"
        })
    }

    await purchaseModel.create({
        userId,
        courseId
    });

    res.json({
        message: "Course purchased successfully"
    })

});

courseRouter.get("/preview", async (req, res) => {
    const cousers = await courseModel.find({});

    res.json({
        cousers
    })
});

module.exports = {
    courseRouter
}