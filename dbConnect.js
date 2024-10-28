const mongoose = require("mongoose");

const url = ("mongodb://localhost:27017/Couser-Selling-App");

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