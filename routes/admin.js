const Router = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminModel, courseModel } = require("../db");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require('../middleware/admin');

const adminRouter = Router();

const adminSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(2),
    firstName: zod.string().min(2),
    lastName: zod.string().min(3),
});

adminRouter.post("/signup", async (req, res) => {
    const result = adminSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.format() });
    }

    const { email, password, firstName, lastName } = result.data;
    try {
        const hasedPassword = await bcrypt.hash(password, 5);

        await adminModel.create({
            email,
            password: hasedPassword,
            firstName,
            lastName,
        });

        res.status(201).json({
            message: "admin created successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});

adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await adminModel.findOne({
            email,
        });

        if (!admin) {
            return res.json({
                message: "User not found",
            });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Incorrect password",
            });
        }

        const { firstName, lastName } = admin;

        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);


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

adminRouter.post("/couser", adminMiddleware, async (req, res) => {
    const adminId = req.adminid;

    const { title, description, imageUrl, price } = req.body;

    try {
        const existingCourse = await courseModel.findOne({ title });

        if (existingCourse) {
            return res.status(400).json({
                message: "A course with this title already exists."
            });
        }

        const course = await courseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId: adminId
        });

        res.status(201).json({
            message: "Course created successfully",
            courseId: course._id
        });

    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Server error" });
    }

});

adminRouter.put("/couser", adminMiddleware, (req, res) => { });

adminRouter.get("/couser", (req, res) => { });

module.exports = {
    adminRouter,
};
