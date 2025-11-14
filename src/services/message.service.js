// src/services/message.service.js
const Message = require("../models/message.model");

exports.createMessage = async (data) => {
  return await Message.create(data);
};

exports.getMessagesBetween = async (userA, userB) => {
  return await Message.find({
    $or: [
      { sender: userA, receiver: userB },
      { sender: userB, receiver: userA },
    ],
  }).sort({ createdAt: 1 });
};

exports.markMessagesRead = async (ids) => {
  return await Message.updateMany({ _id: { $in: ids } }, { read: true });
};
