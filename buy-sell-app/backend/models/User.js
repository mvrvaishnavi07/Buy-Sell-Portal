const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  age: Number,
  contactNumber: String,
  password: String,
  itemsForSale: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  cart: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }, // Reference to the Item model
      addedAt: { type: Date, default: Date.now }, // Tracks when the item was added
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
