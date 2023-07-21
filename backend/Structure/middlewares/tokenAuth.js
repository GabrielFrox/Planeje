const jwt = require('jsonwebtoken');
const User = require('../models/Users');
require('dotenv').config();

const { JWT_SECRET } = process.env;
// console.log(JWT_SECRET);

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  
  if (!token) return res.status(401).json({ message: "Token não encontrado" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // const user = await User.findById(decoded.loginResult.id);

    next();
  } catch (error) {
    
  }

};
