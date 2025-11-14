// src/routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

// Public
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected
router.get("/", auth, userController.getAllUsers);

module.exports = router;
