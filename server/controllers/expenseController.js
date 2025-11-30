const Expense = require("../models/Expense");
const Group = require("../models/Group");
const Notification = require("../models/Notification");
const { calculateBalances } = require("../utils/balanceCalculator");

const addExpense = async (req, res) => {
    const { description, amount, payer, splitType, shares, receiptUri } =
        req.body;
    const { groupId } = req.params;

    const group = await Group.findById(groupId);

    if (!group) {
        return res.status(404).json({ message: "Group not found" });
    }

    const isMember = group.members.some(
        (member) => member.user.toString() === req.user.id
    );
    if (!isMember) {
        return res.status(403).json({ message: "Not authorized" });
    }

    const expense = await Expense.create({
        group: groupId,
        description,
        amount,
        payer,
        splitType,
        shares,
        receiptUri,
        addedBy: req.user.id,
    });

    group.expenses.push(expense._id);
    await group.save();



    const io = req.app.get("io");
    console.log(`Emitting expense_added to group: ${groupId}`);
    io.to(groupId).emit("expense_added", expense);

    res.status(201).json(expense);
};


const getExpenses = async (req, res) => {
    const { groupId } = req.params;

    const expenses = await Expense.find({ group: groupId })
        .populate("payer", "name")
        .populate("addedBy", "name")
        .sort({ createdAt: -1 });

    res.json(expenses);
};


const updateExpense = async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.addedBy.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to edit this expense" });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    const io = req.app.get("io");
    console.log(`Emitting expense_updated to group: ${expense.group}`);
    io.to(expense.group.toString()).emit("expense_updated", updatedExpense);

    res.json(updatedExpense);
};


const deleteExpense = async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.addedBy.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to delete this expense" });
    }

    await Group.findByIdAndUpdate(expense.group, {
        $pull: { expenses: expense._id },
    });

    await expense.deleteOne();

    const io = req.app.get("io");
    console.log(`Emitting expense_deleted to group: ${expense.group}`);
    io.to(expense.group.toString()).emit("expense_deleted", expense._id);

    res.json({ message: "Expense removed" });
};

module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
};
