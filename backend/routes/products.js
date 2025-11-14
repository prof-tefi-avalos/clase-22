import express from "express";
import Product from "../models/Product.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

// protegido
router.get("/", authMiddleware, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// puede seguir público, o agregarle el middleware si lo queremos priv
router.post("/", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

export default router;
