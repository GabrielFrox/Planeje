const router = require('express').Router();

const userController = require('../controllers/userController');

// router.route("/user")
router.post('/user', userController.create);
router.get('/user/:id', userController.findOneById);
// router.get((req, res) => userController.findOneById(req, res));

module.exports = router;