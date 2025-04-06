


// / chatBotRoutes.js
const express = require('express');
const router = express.Router();
const chatBotController = require('../controllers/chatBotController');
// const { authenticateToken } = require('../middleware/auth');
const { protect } = require("../middlewares/authMiddleware");

// Single route for handling messages
router.post('/message', protect, chatBotController.handleMessage);

module.exports = router;
