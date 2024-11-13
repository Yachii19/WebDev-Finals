const express = require("express");
// Express routing component
const router = express.Router();
const userController = require("../controllers/User-Controllers.js");

// User Registration
router.post("/register", userController.registerUser);

// User Login
router.post("/login", userController.loginUser);

// Check if email exists
router.post("/check-email", userController.checkEmail);

router.post("/details", userController.getProfile);

module.exports = router;