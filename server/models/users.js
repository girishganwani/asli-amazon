import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
      default: 2,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("Users", userSchema);

export default userModel;
