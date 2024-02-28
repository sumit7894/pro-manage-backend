const express = require('express');
const {update} = require('../controllers/user-controller');

const {createTask,getTask,updateCategory,deleteTask,updateTask} = require('../controllers/task-controller');
const authenticateUser = require('../middleware/auth');
const userRouter = express.Router();

userRouter.route('/update').patch(authenticateUser,update);

userRouter.route('/task').post(authenticateUser,createTask);
userRouter.route('/task/edit').patch(authenticateUser,updateTask);

userRouter.route('/alltask').get(getTask);

userRouter.route('/category/update').patch(authenticateUser,updateCategory);
userRouter.route('/task/delete').delete(authenticateUser,deleteTask);


module.exports = userRouter;