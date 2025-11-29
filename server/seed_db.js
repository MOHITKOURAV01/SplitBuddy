require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Group = require("./models/Group");
const Expense = require("./models/Expense");

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/splitbuddy");
        console.log("Connected to MongoDB...");

        // Clear existing data
        await User.deleteMany({});
        await Group.deleteMany({});
        await Expense.deleteMany({});
        console.log("Cleared existing data...");

        // Create Users
        const user1 = await User.create({
            name: "Mario",
            email: "mario@chaos.com",
            password: "password123",
        });

        const user2 = await User.create({
            name: "Luigi",
            email: "luigi@chaos.com",
            password: "password123",
        });

        const user3 = await User.create({
            name: "Peach",
            email: "peach@chaos.com",
            password: "password123",
        });

        console.log("Users created...");

        // Create Group
        const group = await Group.create({
            name: "Amalfi Coast 2024",
            description: "Pizza, Pasta, and Poor Financial Decisions",
            creator: user1._id,
            members: [
                { user: user1._id, status: "joined" },
                { user: user2._id, status: "joined" },
                { user: user3._id, status: "joined" },
            ],
        });

        // Add group to users
        await User.updateMany(
            { _id: { $in: [user1._id, user2._id, user3._id] } },
            { $push: { groups: group._id } }
        );

        console.log("Group created: Amalfi Coast 2024");

        // Create Expense
        const expense = await Expense.create({
            description: "Welcome Spritz",
            amount: 4500, // ₹4500
            currency: "INR",
            payer: user1._id,
            addedBy: user1._id,
            group: group._id,
            splitMethod: "equal",
            shares: [
                { user: user1._id, amount: 1500 },
                { user: user2._id, amount: 1500 },
                { user: user3._id, amount: 1500 },
            ],
        });

        // Add expense to group
        group.expenses.push(expense._id);
        await group.save();

        console.log("Expense added: Welcome Spritz");

        console.log("Database seeded successfully! 🇮🇹🍝");
        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedData();
