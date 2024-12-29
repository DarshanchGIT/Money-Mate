const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

// Middleware for handling CORS and JSON requests
app.use(cors({ origin: "https://money-mate-gamma.vercel.app" }));
app.use(express.json());

// Welcome Route
app.get("/", (req, res) => {
  res.send("Welcome to Money Mate 💵");
});

// Mount the routes under /api/v1
app.use("/api/v1", routes);

// Catch invalid routes (404)
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start listening on the specified port
app.listen(PORT, () => console.log(`App is listening at port ${PORT}`));
