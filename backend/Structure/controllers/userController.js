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

      const response = await User.create(user);
      const token = jwt.sign({ response }, JWT_SECRET, jwtConfig);

      res.status(201).json({
        token,
        msg: "Usuário criado com sucesso"
      });

    } catch (error) {
      console.log(error);
    }
  },

  findOneById: async(req, res) => {
    try {
      const { id } = req.params;

      const response = await User.findById(id);

      res.status(200).json(response);
      
    } catch (error) {
      // console.log(error);
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
  }
};

module.exports = userController;