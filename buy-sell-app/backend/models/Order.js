


const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const orderSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: {
      validator: function(v) {
        return /^\d+$/.test(v);
      },
      message: props => `${props.value} must contain only numbers!`
    }
  },
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  otp: { type: String, required: true }, // Plain OTP stored temporarily
  otpHash: { type: String, required: true }, // Hashed OTP for security
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

orderSchema.pre("save", async function (next) {

  
  if (!this.isModified("otp")) return next();

  // Generate the plain OTP
  const plainOtp = this.otp;
  // Hash the OTP for storage in the otpHash field
  const salt = await bcrypt.genSalt(10);
  this.otpHash = await bcrypt.hash(plainOtp, salt);

  // Optionally, set the plain OTP to null or remove after hashing if needed
  // this.otp = null; // Optional, if you want to remove the plain OTP after hashing

  next();
});

// Method to compare OTPs during verification
orderSchema.methods.verifyOTP = async function (enteredOTP) {
  // Compare entered OTP with the hashed OTP stored in the database
  return await bcrypt.compare(enteredOTP, this.otpHash);
};

module.exports = mongoose.model("Order", orderSchema);

