const jwt = require('jsonwebtoken');
const User = require('../models/Users');
require('dotenv').config();

const { JWT_SECRET } = process.env;
// console.log(JWT_SECRET);

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) return res.status(401).json({ message: "Token não encontrado" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) res.status(401).json({ message: "Token inválido" });

    console.log(decoded);
  });
  next();
};
