import express from "express";
import {
  signIn,
  signUp,
  fetchUsers,
  deleteUser,
  forgotPassword,
} from "../controllers/auth.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/forgotPassword", forgotPassword);
router.get("/fetchUsers", auth, fetchUsers);
router.delete("/deleteUser/:id", auth, deleteUser);

export default router;
