import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },

    isAvailable: {
      type: Boolean,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Categories", categorySchema);

export default categoryModel;
