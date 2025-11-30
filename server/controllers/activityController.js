const ActivityLog = require("../models/ActivityLog");


const getActivityLog = async (req, res) => {
    const { groupId } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const logs = await ActivityLog.find({ group: groupId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "name");

    res.json(logs);
};

module.exports = {
    getActivityLog,
};
