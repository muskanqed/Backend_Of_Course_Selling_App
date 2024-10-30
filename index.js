const express = require("express");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin")
const { courseRouter } = require("./routes/course");
const { connectToDb } = require("./dbConnect");

const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/couser", courseRouter);




async function main() {
    try {
        await connectToDb();
        app.listen(3000, () => {
            console.log(`Server listening on port 3000`);
        });
    } catch (error) {
        console.error(`Failed to connect to the database: ${error.message}`);
        process.exit(1);
    }
}

main();
