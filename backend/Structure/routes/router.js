const router = require('express').Router();

// Users router
const userRouter = require('./user');

router.use("/", userRouter);

module.exports = router;