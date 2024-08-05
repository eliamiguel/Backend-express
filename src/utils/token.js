const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const decryptedToken = async (authHeader) => {
  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Token não fornecido");
  }

  return promisify(jwt.verify)(token, process.env.HASH_BCRYPT);
};

module.exports = { decryptedToken };
