import categoryModel from "../models/category.js";

const fetchCategories = async () => {
  const categories = categoryModel.find();
  return categories;
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName, isAvailabe } = req.body;
  try {
    await categoryModel.findByIdAndUpdate(id, {
      categoryName,
      isAvailabe,
      slug,
    });
    const categories = await fetchCategories();
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await fetchCategories();
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await categoryModel.findByIdAndDelete(id);
    const categories = await fetchCategories();
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
};

export const addCategory = async (req, res) => {
  const { categoryName, isAvailable, slug } = req.body;
  try {
    const category = new categoryModel({
      categoryName,
      isAvailable,
      slug,
    });
    await category.save();
    const categories = await fetchCategories();
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
};
