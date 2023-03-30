import express from "express";
import {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "../controllers/category.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/admin/addCategory", auth, addCategory);
router.get("/admin/fetchCategories", auth, getCategories);
router.delete("/admin/deleteCategory/:id", auth, deleteCategory);
router.patch("/admin/updateCategory/:id", auth, updateCategory);

export default router;
