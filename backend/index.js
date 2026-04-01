import express from "express";
import cors from "cors";
import "dotenv/config";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import authenticateToken from "./utilities.js";
import User from "./models/User.js";

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  }),
);

app.get("/", (req, res) => {
  res.json({ data: "Hello There" });
});

// Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({
      error: true,
      message: "User already exists",
    });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

app.listen(8000);

export default app;
