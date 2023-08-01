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
      const { body: userData } = req;

      await User.create(userData);

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
      return res.status(401).json({ message: error.message });
    }
  },

  getUserInfo: async(req, res) => {
    try {
      const id = req.userId;
      const result = await User.findById(id, '-password -_id -createdAt -updatedAt -__v');
      if (!result) throw new Error('Usuário não encontrado');

      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
};

module.exports = userController;