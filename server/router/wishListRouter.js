import express from "express";
import {
  addToWishList,
  removeFromWishList,
  fetchAllItemsFromWishList,
} from "../controllers/wishList.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addToWishList", auth, addToWishList);
router.delete("/removeFromWishList/:id", auth, removeFromWishList);
router.get("/fetchAllItemsFromWishList", auth, fetchAllItemsFromWishList);

export default router;
