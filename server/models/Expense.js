const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
    {
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        payer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        splitType: {
            type: String,
            enum: ["equal", "unequal", "shares", "percent"],
            default: "equal",
        },
        shares: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                amount: {
                    type: Number,
                },
                percent: {
                    type: Number,
                },
            },
        ],
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "disputed"],
            default: "approved",
        },
        receiptUri: {
            type: String,
        },
        isPayment: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
