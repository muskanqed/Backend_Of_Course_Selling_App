const express = require("express");
const { userRoute } = require("./routes/user");
const { courseRoute } = require("./routes/course");

const app = express();

app.use("/user", userRoute);
app.use("/couser", courseRoute);



app.listen(3000, () => {
    console.log(`serving running on port 3000`);
});
