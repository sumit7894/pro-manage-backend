const express = require('express');
const {update} = require('../controllers/user-controller');

const {createTask,getTask,updateCategory} = require('../controllers/task-controller')
const userRouter = express.Router();

userRouter.route('/update').patch(update);

userRouter.route('/task').post(createTask);
userRouter.route('/alltask').get(getTask);

userRouter.route('/category/update').patch(updateCategory);


module.exports = userRouter;