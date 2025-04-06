const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register new user
exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get user profile (GET /profile)
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password from response
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update user profile (PUT /profile)
exports.updateProfile = async (req, res) => {
  const { firstName, email, age, contactNumber } = req.body;

  // Check if required fields are provided
  if (!firstName && !email && !age && !contactNumber) {
    return res.status(400).json({ message: "Please provide at least one field to update" });
  }

  try {
    const user = await User.findById(req.user.id); // req.user.id comes from the 'protect' middleware
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only the fields that are provided
    if (firstName) user.firstName = firstName;
    // if (email) user.email = email;
    if (age) user.age = age;
    if (contactNumber) user.contactNumber = contactNumber;

    // Save the updated user
    await user.save();
    console.log(user);
    res.status(200).json({
      message: "Profile updated successfully",
      updatedUser: {
        firstName: user.firstName,
        // email: user.email,
        age: user.age,
        contactNumber: user.contactNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};

// Logout user (POST /logout)
exports.logout = (req, res) => {
  // Client side handles token removal, so no changes on server-side required for simple logout
  res.status(200).json({ message: "Logged out successfully" });
};
