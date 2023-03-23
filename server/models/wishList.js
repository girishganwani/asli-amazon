import mongoose from "mongoose";

const wishListSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const wishListModel = mongoose.model("wishList", wishListSchema);

export default wishListModel;
