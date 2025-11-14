// src/routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const { getMe } = require("../controllers/user.controller");


// Public
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", auth, getMe);

// Protected
router.get("/", auth, userController.getAllUsers);

module.exports = router;
