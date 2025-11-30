const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
    const notifications = await Notification.find({ toUser: req.user.id })
        .sort({ createdAt: -1 })
        .populate("fromUser", "name profilePic");

    res.json(notifications);
};


const markAsRead = async (req, res) => {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.toUser.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
    }

    notification.isRead = true;
    await notification.save();

    res.json(notification);
};

module.exports = {
    getNotifications,
    markAsRead,
};
