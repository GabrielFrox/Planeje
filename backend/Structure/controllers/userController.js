const User = require('../models/Users');

const userController = {
  create: async(req, res) => {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      };

      const response = await User.create(user);

      res.status(201).json({response, msg: "Usuário criado com sucesso"});

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
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
  }
};

module.exports = userController;