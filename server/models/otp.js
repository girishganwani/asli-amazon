import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otpCode: {
    type: Number,
    required: true,
  },
});

const otpModel = mongoose.model("otp", otpSchema);

export default otpModel;
