import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";


router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "Email ya registrado" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    passwordHash,
    name
  });

  await user.save();

  res.json({
    message: "Usuario registrado correctamente. Ahora puedes iniciar sesión.",
    user: {
      id: user._id,
      email: user.email,
      name: user.name
    }
  });
});



router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Faltan datos" });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Credenciales invalidas" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: "Credenciales invalidas" });

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
});

export default router;
