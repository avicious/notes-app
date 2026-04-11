import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import authenticateToken from "./utilities.js";

import User from "./models/User.js";
import Note from "./models/Note.js";

import validate from "./middlewares/validate.js";
import { registerSchema, loginSchema } from "./validators/auth.validator.js";
import {
  getNotesSchema,
  noteSchema,
  editNoteSchema,
  deleteNoteSchema,
} from "./validators/notes.validator.js";

const app = express();

// Cookie Parser
app.use(cookieParser());

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

    return res
      .cookie("__Host-accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        maxAge: 72 * 60 * 60 * 1000,
        path: "/",
      })
      .status(201)
      .json({
        error: false,
        message: "Registration Successful",
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
        },
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

    return res
      .cookie("__Host-accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        maxAge: 72 * 60 * 60 * 1000,
        path: "/",
      })
      .status(200)
      .json({
        error: false,
        message: "Login Successful",
        user: {
          id: userInfo._id,
          fullName: userInfo.fullName,
          email: userInfo.email,
        },
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
});

// Logout
app.post("/auth/logout", (req, res) => {
  try {
    res.clearCookie("__Host-accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      path: "/",
    });

    return res.status(200).json({
      error: false,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
});

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findById(userId).select("-password -__v");

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    return res.status(200).json({
      error: false,
      user,
      message: "User profile retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// All Notes
app.get(
  "/notes",
  authenticateToken,
  validate(getNotesSchema, "query"),
  async (req, res) => {
    const { userId } = req.user;
    const { page, limit } = req.query;

    const skip = (page - 1) * limit;

    try {
      const notes = await Note.find({ userId })
        .select("-__v -userId")
        .sort({ isPinned: -1, updatedAt: -1 })
        .skip(skip)
        .limit(limit);

      const totalNotes = await Note.countDocuments({ userId });

      return res.status(200).json({
        error: false,
        message: "All notes retrieved successfully",
        notes,
        pagination: {
          total: totalNotes,
          page,
          pages: Math.ceil(totalNotes / (limit || 20)) || 1,
        },
      });
    } catch (error) {
      console.error("Error fetching notes for user:", userId, error);

      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    }
  },
);

// Add Note
app.post(
  "/notes",
  authenticateToken,
  validate(noteSchema),
  async (req, res) => {
    const { title, content, tags } = req.body;
    const { userId } = req.user;

    try {
      const note = new Note({
        title: title.trim() || "Untitled",
        content: content.trim() || "",
        tags: Array.isArray(tags) ? tags : [],
        userId,
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
app.patch(
  "/notes/:noteId",
  authenticateToken,
  validate(editNoteSchema),
  async (req, res) => {
    const { noteId } = req.params;
    const { userId } = req.user;

    try {
      const note = await Note.findOne({ _id: noteId, userId });

      if (!note) {
        return res.status(404).json({
          error: true,
          message: "Note not found",
        });
      }

      const allowedUpdates = ["title", "content", "tags", "isPinned"];

      allowedUpdates.forEach((update) => {
        if (req.body[update] !== undefined) {
          note[update] = req.body[update];
        }
      });

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
  },
);

// Delete Note
app.delete(
  "/notes/:noteId",
  authenticateToken,
  validate(deleteNoteSchema, "params"),
  async (req, res) => {
    const { noteId } = req.params;
    const { userId } = req.user;

    try {
      const deletedNote = await Note.findOneAndDelete({
        _id: noteId,
        userId: userId,
      });

      if (!deletedNote) {
        return res.status(404).json({
          error: true,
          message: "Note not found",
        });
      }

      return res.status(200).json({
        error: false,
        message: "Note deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting note:", error);

      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    }
  },
);

// Search Notes
const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

app.get("/notes/search/", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const { query, page = 1, limit = 10 } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ 
      error: true, 
      message: "A valid search query string is required" 
    });
  }

  const safeQuery = escapeRegex(query);

  try {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const matchingNotes = await Note.find({
      userId,
      $or: [
        { title: { $regex: new RegExp(safeQuery, "i") } },
        { content: { $regex: new RegExp(safeQuery, "i") } },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    const totalMatchingNotes = await Note.countDocuments({
      userId,
      $or: [
        { title: { $regex: new RegExp(safeQuery, "i") } },
        { content: { $regex: new RegExp(safeQuery, "i") } },
      ],
    });

    return res.json({
      error: false,
      notes: matchingNotes,
      pagination: {
        total: totalMatchingNotes,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalMatchingNotes / limitNumber)
      },
      message: "Notes retrieved successfully",
    });

  } catch (error) {
    console.error("Search notes error:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.listen(8000, () => console.log("Server running on port 8000"));

export default app;
