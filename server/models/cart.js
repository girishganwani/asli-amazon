import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
});

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
