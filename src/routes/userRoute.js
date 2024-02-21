const express = require('express');
const {update} = require('../controllers/user-controller');

const userRouter = express.Router();

userRouter.route('/update').patch(update);

module.exports = userRouter;