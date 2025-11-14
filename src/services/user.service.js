// src/services/user.service.js
const User = require("../models/user.model");

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.createUser = async (data) => {
  return await User.create(data);
};

exports.getAllUsers = async () => {
  return await User.find().select("-password");
};
