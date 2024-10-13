const { JWT_SECRET } = require("../security/config");
const jwt = require("jsonwebtoken");

const secretKey = JWT_SECRET;

const generateToken = (payload) => {
  const options = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = {
  generateToken,
  decodeToken,
};
