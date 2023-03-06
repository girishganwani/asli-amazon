import express from "express";
import {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "../controllers/category.js";

const router = express.Router();

router.post("/admin/addCategory", addCategory);
router.get("/admin/fetchCategories", getCategories);
router.delete("/admin/deleteCategory/:id", deleteCategory);
router.patch("/admin/updateCategory/:id", updateCategory);

export default router;
