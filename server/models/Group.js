const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        members: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                joinedAt: {
                    type: Date,
                    default: Date.now,
                },
                status: {
                    type: String,
                    enum: ["invited", "joined", "left"],
                    default: "joined",
                },
            },
        ],
        expenses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Expense",
            },
        ],
        isSettled: {
            type: Boolean,
            default: false,
        },
        settledAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
