import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    catId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);

export default productModel;
