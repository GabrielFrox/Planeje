const router = require('express').Router();
// const tokenAuth = require('../middlewares/tokenAuth');
const checkExistence = require('../middlewares/checkExistence');

const userController = require('../controllers/userController');

router.post('/user/register', checkExistence, userController.create);
router.post('/user', userController.login);

module.exports = router;