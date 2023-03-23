import express from "express";
import {
  addToCart,
  fetchAllItemsFromCart,
  removeFromCart,
  updateCart,
  deleteAll,
} from "../controllers/cart.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addToCart", auth, addToCart);
router.get("/fetchAllItmesFromCart", auth, fetchAllItemsFromCart);
router.delete("/removeFromCart/:id", auth, removeFromCart);
router.patch("/updateCart/:id", auth, updateCart);
router.delete("/deleteAll", auth, deleteAll);

export default router;
