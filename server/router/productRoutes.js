import express from "express";
import {
  addProduct,
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/product.js";
import multer from "multer";

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

router.post("/admin/addProduct", upload.single("image"), addProduct);
router.get("/admin/fetchProducts", fetchProducts);
router.delete("/admin/deleteProduct/:id", deleteProduct);
router.patch("/admin/updateProduct/:id", upload.single("image"), updateProduct);

export default router;
