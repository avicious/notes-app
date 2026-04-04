import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import authenticateToken from "./utilities.js";

import User from "./models/User.js";
import Note from "./models/Note.js";

import validate from "./middlewares/validate.js";
import { registerSchema, loginSchema } from "./validators/auth.validator.js";
import { noteSchema } from "./validators/notes.validator.js";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://notes-app-domain.com"
        : "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

// Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// Routes
// Register
app.post("/auth/register", validate(registerSchema), async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(409).json({
        error: true,
        message: "User already exists",
      });
    }

    const newUser = new User({ fullName, email, password });
    await newUser.save();

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "72h" },
    );

    return res.status(201).json({
      error: false,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
      accessToken,
      message: "Registration Successful",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
});

// Login
app.post("/auth/login", validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;

  try {
    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid credentials" });
    }

    const isPasswordValid = await userInfo.comparePassword(password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { userId: userInfo._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "72h" },
    );

    return res.json({
      error: false,
      message: "Login Successful",
      user: {
        id: userInfo._id,
        fullName: userInfo.fullName,
        email: userInfo.email,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
});

// Add Note
app.post(
  "/notes",
  authenticateToken,
  validate(noteSchema),
  async (req, res) => {
    const { title, content, tags } = req.body;
    const user = req.user;

    try {
      const note = new Note({
        title: title.trim(),
        content: content.trim(),
        tags: Array.isArray(tags) ? tags : [],
        userId: user.userId,
      });

      await note.save();

      return res.status(201).json({
        error: false,
        note,
        message: "Note added successfully",
      });
    } catch (error) {
      console.error("Add Note Error:", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }
  },
);

// Edit Note
app.patch("/notes/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags, isPinned } = req.body;

  const { userId } = req.user;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: true,
      message: "No changes provided",
    });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });
    }

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (tags !== undefined) note.tags = tags;
    if (typeof isPinned !== "undefined") note.isPinned = isPinned;

    await note.save();

    return res.status(200).json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error("Edit Note Error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

app.listen(8000, () => console.log("Server running on port 8000"));

export default app;
