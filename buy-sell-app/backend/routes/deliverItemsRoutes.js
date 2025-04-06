

const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getDeliverableItems,deliverItems } = require("../controllers/deliverItemsController");
const router = express.Router();

// GET: Fetch the deliverable items where the current user is the seller
router.get("/", protect, getDeliverableItems);

router.post("/", protect ,deliverItems);

module.exports = router; 