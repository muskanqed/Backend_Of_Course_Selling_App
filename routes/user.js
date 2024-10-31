const express = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
const { JWT_USER_PASSWORD } = require("../config");


const Router = express.Router;
// const {Router} = require("express");

const userRouter = Router();

const userSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(3),
    firstName: zod.string().min(3),
    lastName: zod.string().min(3)
})

userRouter.post("/signup", async (req, res) => {
    const result = userSchema.safeParse(req.body);
    try {
        if (!result.success) {
            return res.status(404).json({
                message: "Incorrect Format",
                error: result.error.format()
            })
        }

        const { email, password, firstName, lastName } = result.data;

        const hashed = await bcrypt.hash(password, 5);

        await userModel.create({
            email,
            password: hashed,
            firstName,
            lastName
        });

        return res.json({
            message: "User created successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }


});

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({
            email,
        });

        if (!user) {
            return res.json({
                message: "User not found",
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Incorrect password",
            });
        }

        const { firstName, lastName } = user;

        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD)

        return res.json({
            firstName,
            lastName,
            token,
            message: "Signin successful",
        });
    } catch (error) {
        console.error("Error during signin:", error);
        return res.json({
            message: "server down baby",
        });
    }
});

userRouter.get("/purchases", (req, res) => { });

module.exports = {
    userRouter,
};
