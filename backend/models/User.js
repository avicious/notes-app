import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

// Schema for users: fullName, email, password & timestamps
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true, // This automatically adds 'createdAt' and 'updatedAt' fields.
  },
);

// Pre-save function to hash and salt password using bcrypt
userSchema.pre("save", async function () {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
});

// Method to compare password using bcrypt
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
