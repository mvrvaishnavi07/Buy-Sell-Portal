
const express = require("express");
const {getOrders} = require("../controllers/orderHistoryController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", protect, getOrders);

module.exports = router; 
