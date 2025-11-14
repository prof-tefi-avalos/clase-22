import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
