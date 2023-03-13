import productModel from "../models/product.js";
import categoryModel from "../models/category.js";

const getProducts = async () => {
  const products = await productModel.find().populate("catId");
  return products;
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productModel.findByIdAndDelete(id);
    const products = await getProducts();
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
};

export const fetchProducts = async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
};

export const addProduct = async (req, res) => {
  const { name, price, quantity, catId, isAvailable } = req.body;
  const image = req.file?.originalname;

  try {
    const product = new productModel({
      name,
      price,
      quantity,
      catId,
      isAvailable,
      image,
    });
    await product.save();
    const products = await getProducts();
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
};

export const updateProduct = async (req, res) => {
  const { name, price, quantity, catId, isAvailable } = req.body;
  const image = req.file?.originalname;
  const { id } = req.params;
  try {
    await productModel.findByIdAndUpdate(id, {
      name,
      price,
      quantity,
      catId,
      isAvailable,
      image,
    });
    const products = await getProducts();
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { slug } = req.body;
  try {
    const categoryId = await categoryModel.findOne({ slug }).select("_id");
    if (!categoryId) {
      return res.json({ data: [] });
    }
    const { _id: catId } = categoryId;
    const products = await productModel.find({ catId });
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
};
