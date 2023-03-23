import wishListModel from "../models/wishList.js";

const fetchWishList = async (userId) => {
  const products = await wishListModel.find({ userId }).populate("productId");
  return products;
};

export const fetchAllItemsFromWishList = async (req, res) => {
  const userId = req.user.id;
  const products = await fetchWishList(userId);
  res.status(200).json({ data: products });
};

export const addToWishList = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;
  const product = new wishListModel({ productId, userId });
  await product.save();
  const products = await fetchWishList(userId);
  res.status(200).json({ data: products });
};

export const removeFromWishList = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  await wishListModel.findByIdAndDelete(id);
  const products = await fetchWishList(userId);
  res.status(200).json({ data: products });
};
