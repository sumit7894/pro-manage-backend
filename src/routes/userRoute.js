const express = require('express');
const {update} = require('../controllers/user-controller');

const {createTask,getTask,updateCategory,deleteTask} = require('../controllers/task-controller');
const authenticateUser = require('../middleware/auth');
const userRouter = express.Router();

userRouter.route('/update').patch(update);

userRouter.route('/task').post(authenticateUser,createTask);
userRouter.route('/alltask').get(getTask);

userRouter.route('/category/update').patch(updateCategory);
userRouter.route('/task/delete').delete(deleteTask);


module.exports = userRouter;