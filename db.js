const mongoose = require("mongoose");
const { connectToDb } = require("./dbConnect");
connectToDb();

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const User = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String
});

const Admin = new Schema({
    name: String,
    email: String,
    password: String
});

const Course = new Schema({
    title: String,
    description: String,
    price: Number,
    adminid: ObjectId
});

const Purchases = new Schema({
    purchaseid: ObjectId,
    courseid: ObjectId,
    userid: ObjectId
});

const UserModel = mongoose.model('user', User);
const AdminModel = mongoose.model('admin', Admin);
const CourseModel = mongoose.model('couser', Course);
const PurchasesModel = mongoose.model('purchases', Purchases);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchasesModel
}