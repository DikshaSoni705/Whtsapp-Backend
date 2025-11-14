// src/controllers/message.controller.js
const Message = require("../models/message.model");
const User = require("../models/user.model");

// create/send message (persist)
exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    if (!sender || !receiver || !content)
      return res.status(400).json({ message: "Missing fields" });

    const msg = await Message.create({ sender, receiver, content });
    // Optionally populate sender/receiver for response
    const populated = await msg.populate("sender", "name email").populate("receiver", "name email").execPopulate();

    res.status(201).json(populated);
  } catch (err) {
    console.error("Send Message Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// get conversation between two users (paginated basic)
exports.getConversation = async (req, res) => {
  try {
    const { userA, userB } = req.query;
    if (!userA || !userB) return res.status(400).json({ message: "userA and userB required" });

    const messages = await Message.find({
      $or: [
        { sender: userA, receiver: userB },
        { sender: userB, receiver: userA },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name email")
      .populate("receiver", "name email");

    res.json(messages);
  } catch (err) {
    console.error("Get Conversation Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// mark messages as read
exports.markAsRead = async (req, res) => {
  try {
    const { messageIds } = req.body; // array of message _id
    if (!Array.isArray(messageIds) || messageIds.length === 0)
      return res.status(400).json({ message: "messageIds required" });

    await Message.updateMany({ _id: { $in: messageIds } }, { $set: { read: true } });
    res.json({ success: true });
  } catch (err) {
    console.error("Mark Read Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
