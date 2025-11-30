require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Group = require("./models/Group");
const Expense = require("./models/Expense");
const Settlement = require("./models/Settlement");
const Notification = require("./models/Notification");
const ActivityLog = require("./models/ActivityLog");

const clearData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");

        await User.deleteMany({});
        await Group.deleteMany({});
        await Expense.deleteMany({});
        await Settlement.deleteMany({});
        await Notification.deleteMany({});
        await ActivityLog.deleteMany({});

        console.log("All data cleared! Database is empty.");
        process.exit();
    } catch (error) {
        console.error("Error clearing database:", error);
        process.exit(1);
    }
};

clearData();
