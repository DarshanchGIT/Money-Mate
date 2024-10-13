const { decodeToken } = require("../utils/JWTutil");

const usermiddleware = async (req, res, next) => {
  let token = req.headers["authorization"];

  try {
    if (!token) {
      return res.status(403).json({ message: "Token is required" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    } else {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = decodeToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    //if token verified correctly then request body m bhej do userId ko
    if (decoded.userId) req.userId = decoded.userId;
    //call the next middleware in line
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in authenticating user", error: error.message });
  }
};

module.exports = {
  usermiddleware,
};
