const { decodeToken } = require("../utils/JWTutil");

const usermiddleware = async (req, res, next) => {
  let token = req.headers.authorization;

  try {
    if (!token) {
      return res.status(403).json({ message: "Token is required" });
    }

    // Remove "Bearer " prefix if it exists
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = decodeToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (decoded.userId) {
      req.userId = decoded.userId; // Attach userId to request
    }

    next(); // Proceed to the next middleware
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in authenticating user", error: error.message });
  }
};

module.exports = {
  usermiddleware,
};
