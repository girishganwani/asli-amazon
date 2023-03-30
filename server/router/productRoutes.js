import express from "express";
import {
  addProduct,
  fetchProducts,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
} from "../controllers/product.js";
import multer from "multer";
import auth from "../middleware/auth.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "productImages/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/admin/addProduct", upload.single("image"), auth, addProduct);
router.get("/admin/fetchProducts", auth, fetchProducts);
router.delete("/admin/deleteProduct/:id", auth, deleteProduct);
router.patch(
  "/admin/updateProduct/:id",
  upload.single("image"),
  auth,
  updateProduct
);
router.post("/getProductsByCategory", auth, getProductsByCategory);

export default router;
