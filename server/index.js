import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import authRoutes from "./router/authRoutes.js";
import categoryRoutes from "./router/categoryRoutes.js";
import productRoutes from "./router/productRoutes.js";
import cartRoutes from "./router/cartRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://girishganwani:girish1988@asliamazon.m1a1nqk.mongodb.net/asliamazon",
  { useNewUrlParser: true }
);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "productImages")));

app.use("/auth", authRoutes);

app.use("/category", categoryRoutes);

app.use("/product", productRoutes);

app.use("/cart", cartRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}...`);
});
