// src/controllers/message.controller.js

const Message = require("../models/message.model");
const User = require("../models/user.model");

// SEND MESSAGE
exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    if (!sender || !receiver || !content) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const msg = await Message.create({
      sender,
      receiver,
      content,
      read: false,
    });

    // Proper populate for new Mongoose versions
    const populatedMsg = await Message.findById(msg._id)
      .populate("sender", "name email")
      .populate("receiver", "name email");

    return res.status(201).json(populatedMsg);
  } catch (err) {
    console.error("Send Message Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET CONVERSATION BETWEEN 2 USERS
exports.getConversation = async (req, res) => {
  try {
    const { userA, userB } = req.query;

    if (!userA || !userB) {
      return res.status(400).json({ message: "userA & userB required" });
    }

    const messages = await Message.find({
      $or: [
        { sender: userA, receiver: userB },
        { sender: userB, receiver: userA },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name email")
      .populate("receiver", "name email");

    return res.status(200).json(messages);
  } catch (err) {
    console.error("Get Conversation Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// MARK MULTIPLE MESSAGES AS READ
exports.markAsRead = async (req, res) => {
  try {
    const { messageIds } = req.body;

    if (!Array.isArray(messageIds) || messageIds.length === 0) {
      return res.status(400).json({ message: "messageIds array required" });
    }

    await Message.updateMany(
      { _id: { $in: messageIds } },
      { $set: { read: true } }
    );

    return res.json({ success: true });
  } catch (err) {
    console.error("Mark Read Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
