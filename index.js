const express = require("express");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin")
const { courseRouter } = require("./routes/course");
const { connectToDb } = require("./dbConnect");

const app = express();


app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/couser", courseRouter);


async function main() {
    if (connectToDb() === true) {
        app.listen(3000, () => {
            console.log(`serving running on port 3000`);
        });
    }
    else {
        return;
    }

}

main();