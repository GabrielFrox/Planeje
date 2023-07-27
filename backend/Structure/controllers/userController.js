const User = require('../models/Users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256'
};

const userController = {
  create: async(req, res) => {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      };

      await User.create(user);

      res.status(201).json({
        message: "Usuário criado com sucesso"
      });

    } catch (error) {
      console.log(error);
    }
  },

  login: async(req, res) => {
    try {
      const { email, password } = req.body;

      const response = await User.findOne({ email, password });
      if (!response) throw new Error("Usuário ou senha incorretos");

      const token = jwt.sign({ response }, JWT_SECRET, jwtConfig);

      res.status(200).json({ token, response });
      
    } catch (error) {
      // console.log(error.message);
      return res.status(401).json({ message: error.message });
    }
  }
};

module.exports = userController;