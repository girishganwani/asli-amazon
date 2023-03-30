import cartModel from "../models/cart.js";

const fetchCart = async (userId) => {
  const products = await cartModel.find({ userId }).populate("productId");
  return products;
};

export const fetchAllItemsFromCart = async (req, res) => {
  const userId = req.user.id;
  const products = await fetchCart(userId);
  res.status(200).json({ data: products });
};

export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  const item = new cartModel({
    productId,
    userId,
  });
  await item.save();
  const products = await fetchCart(userId);
  res.status(200).json({ data: products });
};

export const removeFromCart = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  await cartModel.findByIdAndDelete(id);
  const products = await fetchCart(userId);
  res.status(200).json({ data: products });
};

export const deleteAll = async (req, res) => {
  const userId = req.user.id;
  await cartModel.deleteMany({ userId });
};

export const updateCart = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const userId = req.user.id;
  await cartModel.findByIdAndUpdate(id, { quantity });
  const products = await fetchCart(userId);
  res.status(200).json({ data: products });
};
