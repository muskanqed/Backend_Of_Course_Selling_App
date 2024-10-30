const Router = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
const { adminModel } = require("../db");

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
        const user = await adminModel.findOne({
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

        return res.json({
            firstName,
            lastName,
            message: "Signin successful",
        });
    } catch (error) {
        console.error("Error during signin:", error);
        return res.json({
            message: "server down baby",
        });
    }
});

adminRouter.post("/couser", (req, res) => { });

adminRouter.put("/couser", (req, res) => { });

adminRouter.get("/couser", (req, res) => { });

module.exports = {
    adminRouter,
};
