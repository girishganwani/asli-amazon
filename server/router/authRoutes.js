import express from "express";
import { signIn, signUp, fetchUsers, deleteUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.get("/fetchUsers", fetchUsers);
router.delete("/deleteUser/:id", deleteUser);

export default router;
