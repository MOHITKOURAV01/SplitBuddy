const Group = require("../models/Group");
const User = require("../models/User");
const Notification = require("../models/Notification");

const createGroup = async (req, res) => {
    const { name, description, members } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Group name is required" });
    }

    const initialMembers = [{ user: req.user.id, status: "joined" }];

    if (members && Array.isArray(members)) {
        members.forEach(member => {
            if (member.id !== req.user.id) {
                initialMembers.push({ user: member.id, status: "invited" });
            }
        });
    }

    const group = await Group.create({
        name,
        description,
        creator: req.user.id,
        members: initialMembers,
    });

    await User.findByIdAndUpdate(req.user.id, { $push: { groups: group._id } });

    if (members && Array.isArray(members)) {
        for (const member of members) {
            if (member.id !== req.user.id) {
                await User.findByIdAndUpdate(member.id, { $addToSet: { groups: group._id } });
            }
        }
    }

    const io = req.app.get("io");

    console.log(`Emitting added_to_group to creator: ${req.user.id}`);
    io.to(req.user.id).emit("added_to_group", group);

    if (members && Array.isArray(members)) {
        members.forEach(member => {
            if (member.id !== req.user.id) {
                console.log(`Emitting added_to_group to member: ${member.id}`);
                io.to(member.id).emit("added_to_group", group);
            }
        });
    }

    res.status(201).json(group);
};


const getGroups = async (req, res) => {
    const groups = await Group.find({ "members.user": req.user.id })
        .populate("members.user", "name email profilePic")
        .populate({
            path: "expenses",
            populate: { path: "payer", select: "name" },
        })
        .sort({ createdAt: -1 });

    res.json(groups);
};


const getGroup = async (req, res) => {
    const group = await Group.findById(req.params.id)
        .populate("members.user", "name email profilePic")
        .populate({
            path: "expenses",
            populate: { path: "payer", select: "name" },
        });

    if (!group) {
        return res.status(404).json({ message: "Group not found" });
    }

    const isMember = group.members.some(
        (member) => member.user._id.toString() === req.user.id
    );

    if (!isMember) {
        return res.status(403).json({ message: "Not authorized to view this group" });
    }

    res.json(group);
};

const inviteMember = async (req, res) => {
    const { email } = req.body;
    const group = await Group.findById(req.params.id);

    if (!group) {
        return res.status(404).json({ message: "Group not found" });
    }

    const userToInvite = await User.findOne({ email });

    if (!userToInvite) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMember = group.members.some(
        (member) => member.user.toString() === userToInvite.id
    );

    if (isMember) {
        return res.status(400).json({ message: "User is already a member" });
    }

    group.members.push({ user: userToInvite.id, status: "invited" });
    await group.save();

    await Notification.create({
        toUser: userToInvite.id,
        fromUser: req.user.id,
        type: "invite",
        message: `${req.user.name} invited you to join '${group.name}'`,
        relatedId: group._id,
        relatedModel: "Group",
    });

    const io = req.app.get("io");
    console.log(`Emitting added_to_group (invite) to user: ${userToInvite.id}`);
    io.to(userToInvite.id).emit("added_to_group", group);

    res.json({ message: "Invitation sent" });
};


const joinGroup = async (req, res) => {
    const group = await Group.findById(req.params.id);

    if (!group) {
        return res.status(404).json({ message: "Group not found" });
    }

    const memberIndex = group.members.findIndex(
        (member) => member.user.toString() === req.user.id
    );

    if (memberIndex === -1) {
        return res.status(400).json({ message: "You have not been invited" });
    }

    group.members[memberIndex].status = "joined";
    await group.save();

    await User.findByIdAndUpdate(req.user.id, {
        $addToSet: { groups: group._id },
    });

    res.json({ message: "Joined group successfully" });
};

const settleGroup = async (req, res) => {
    const group = await Group.findById(req.params.id);

    if (!group) {
        return res.status(404).json({ message: "Group not found" });
    }


    const isMember = group.members.some(
        (member) => member.user.toString() === req.user.id
    );

    if (!isMember) {
        return res.status(403).json({ message: "Not authorized" });
    }

    group.isSettled = true;
    group.settledAt = new Date();
    await group.save();

    const io = req.app.get("io");
    console.log(`Emitting group_settled to group: ${req.params.id}`);
    io.to(req.params.id).emit("group_settled", group);

    res.json({ message: "Group settled and archived", group });
};

module.exports = {
    createGroup,
    getGroups,
    getGroup,
    inviteMember,
    joinGroup,
    settleGroup,
};
