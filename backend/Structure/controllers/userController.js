const User = require('../models/Users');

const userController = {
  create: async(req, res) => {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      };
      // console.log(user);

      const response = await User.create(user);

      res.status(201).json({response, msg: "Usuário criado com sucesso"});

    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = userController;