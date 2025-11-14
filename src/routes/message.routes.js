// src/routes/message.routes.js
const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/send", auth, messageController.sendMessage);
router.get("/conversation", auth, messageController.getConversation);
router.put("/read", auth, messageController.markAsRead);

module.exports = router;
