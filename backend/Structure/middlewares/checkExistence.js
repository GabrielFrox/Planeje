const User = require('../models/Users');

const checkExistence = async (req, res, next) => {
  const { email } = req.body;
  try {
    const checkExistence = await User.findOne({ email });
    if (checkExistence) throw new Error('Email já cadastrado');

    next();
  } catch (error) {
    res.status(403).json({ message: error.message })
  }
}

module.exports = checkExistence;
