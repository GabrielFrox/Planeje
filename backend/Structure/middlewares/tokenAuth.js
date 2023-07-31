const jwt = require('jsonwebtoken');
const User = require('../models/Users');
require('dotenv').config();

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) return res.status(401).json({ message: "Token não encontrado" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.response._id;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
