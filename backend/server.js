import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/products.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/productoos", productRoutes);

const PORT = 5002;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
