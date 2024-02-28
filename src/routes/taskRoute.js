const express = require('express');
const { findTask } = require('../controllers/task-controller');

const taskRouter = express.Router();

taskRouter.route('/dashboard/task/:taskId').get(findTask);


module.exports = taskRouter;