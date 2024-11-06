const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(dbUrl)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("Error connecting to DB: " + error));

// User Schema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
});

// User Model
const User = mongoose.model("User", UserSchema);

// Account Schema
const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

// Account Model
const Account = mongoose.model("Account", AccountSchema);

// Export models
module.exports = {
  User,
  Account,
};
