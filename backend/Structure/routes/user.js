const router = require('express').Router();
const tokenAuth = require('../middlewares/tokenAuth');

const userController = require('../controllers/userController');

router.post('/user/register', userController.create);
router.get('/user/:id', userController.findOneById);

module.exports = router;