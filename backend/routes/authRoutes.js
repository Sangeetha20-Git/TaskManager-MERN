const express = require("express");

//To create A group of related routes
const router = express.Router();

//Import the controller
const protect = require("../middleware/authMiddleware");

const { signup, login, getMe, changePassword } = require("../controllers/authController");



router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/change-password", protect, changePassword);

module.exports = router;