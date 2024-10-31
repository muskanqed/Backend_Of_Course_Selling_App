require('dotenv').config();
const mongoose = require("mongoose");

const url = (process.env.MONGO_URL);

async function connectToDb() {
    await mongoose.connect(url, {
        useNewUrlParser: true
    })
        .then(() => {
            console.log("Database connection successful");
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports = {
    connectToDb,
};