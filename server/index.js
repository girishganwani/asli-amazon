import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./router/authRoutes.js";
import categoryRoutes from "./router/categoryRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://girishganwani:girish1988@asliamazon.m1a1nqk.mongodb.net/asliamazon",
  { useNewUrlParser: true }
);

app.use("/auth", authRoutes);

app.use("/category", categoryRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}...`);
});
