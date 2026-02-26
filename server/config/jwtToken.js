const jwt = require("jsonwebtoken");

const generateToken = (id, userType = "") => {
  if (!process.env.JWT_SECRET) {
    throw new Error(
      "JWT_SECRET environment variable is not set. Please configure it before starting the server.",
    );
  }

  return jwt.sign({ id, userType }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = { generateToken };
