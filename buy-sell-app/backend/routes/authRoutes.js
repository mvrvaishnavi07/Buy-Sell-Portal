const express = require("express");
const { register, login, profile , logout, updateProfile} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, profile);
router.put("/profile", protect, updateProfile); 
router.post("/logout", logout);
// router.get("/profile", protect, profile);

module.exports = router;
