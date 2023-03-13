import cartModel from "../models/cart.js";

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  const item = new cartModel({
    productId,
  });
  await item.save();
};
