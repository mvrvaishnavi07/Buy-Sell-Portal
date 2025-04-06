const express = require("express");
const { addItem, getItems, getItemById } = require("../controllers/itemController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// router.get("/", getItems);
router.post("/", protect, addItem);
router.get("/", protect, getItems);
router.get("/:id", protect, getItemById);
module.exports = router;
