import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
